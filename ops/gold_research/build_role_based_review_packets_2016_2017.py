#!/usr/bin/env python3
"""Build deterministic 2016-2017 role-based causal review packets.

No forecasting and no 2018 access.
Review triggers:
1. weekly baseline after final US trading session;
2. all deterministic scheduled NFP/CPI/PCE/FOMC/FOMC-minutes events;
3. unusual daily changes in upper-layer driver series at >= trailing 252-observation
   95th percentile using strictly PRIOR observations (min 126 history).

The trigger materiality threshold only says WHEN TO REVIEW. It never sets direction.
Packets contain point-in-time descriptors and blank fields for the reasoning-layer
judgment defined in ROLE_BASED_CAUSAL_LEDGER_V1_PROTOCOL.md.
"""
from __future__ import annotations

import json, math
from pathlib import Path
from collections import defaultdict
import numpy as np
import pandas as pd

ROOT=Path.home()/'.cache/gold_research'
PROBE=ROOT/'full_upper_layer_probe'
OUT=ROOT/'role_based_review_packets_2016_2017'
OUT.mkdir(parents=True,exist_ok=True)
YEARS=(2016,2017)
DRIVER_Q=0.95
DRIVER_LOOKBACK=252
DRIVER_MIN=126
DRIVERS=('DGS2','DFII5','DFII10','DTWEXBGS','VIXCLS','GLD_TONNES')


def load_fred_raw(name):
    p=PROBE/f'{name}_raw.csv'
    d=pd.read_csv(p)
    d.columns=['date',name]
    d['date']=pd.to_datetime(d.date,errors='coerce')
    d[name]=pd.to_numeric(d[name],errors='coerce')
    return d.dropna(subset=['date']).set_index('date')[name].sort_index()


def load_gld_raw():
    p=PROBE/'gld_official_historical_archive.xlsx'
    d=pd.read_excel(p,sheet_name='US GLD Historical Archive',engine='openpyxl')
    d['date']=pd.to_datetime(d['Date'],errors='coerce')
    d['GLD_TONNES']=pd.to_numeric(d['Tonnes of Gold'],errors='coerce')
    return d.dropna(subset=['date']).set_index('date')['GLD_TONNES'].sort_index()


def load_daily_xau():
    parts=[]
    for y in YEARS:
        d=ROOT/('oanda_2016' if y==2016 else 'oanda_2017_holdout')
        fs=[]
        for m in range(1,13):
            p=d/f'oanda-XAU_USD-{y}-{m}.csv'
            x=pd.read_csv(p,usecols=['time','close'])
            x['time']=pd.to_datetime(x.time,utc=True,errors='coerce')
            x['close']=pd.to_numeric(x.close,errors='coerce')
            fs.append(x.dropna())
        r=pd.concat(fs).drop_duplicates('time',keep='last').sort_values('time').set_index('time').close.astype(float)
        daily=r.resample('1D').last().dropna()
        parts.append(daily)
    return pd.concat(parts).sort_index()


def load_events():
    files=[Path('ops/gold_research/2016_tier_a_event_manifest.csv'),Path('ops/gold_research/2016_tier_a_plus_fomc_minutes_manifest.csv'),Path('ops/gold_research/2017_holdout_event_manifest.csv')]
    frames=[]
    for p in files:
        d=pd.read_csv(p); d['event_time_utc']=pd.to_datetime(d.event_time_utc,utc=True); frames.append(d)
    d=pd.concat(frames,ignore_index=True).drop_duplicates('event_id').sort_values('event_time_utc')
    d=d[d.event_time_utc.dt.year.isin(YEARS)].copy()
    if len(d)!=104: raise RuntimeError(f'EVENT_COUNT_CONTRACT {len(d)}')
    return d


def prior_value(s, ts, lag_obs):
    # daily source dates are timezone-naive. Use data strictly before UTC review day.
    day=pd.Timestamp(ts).tz_convert('UTC').tz_localize(None).normalize()
    a=s[s.index < day].dropna()
    if len(a)<=lag_obs: return math.nan
    return float(a.iloc[-1-lag_obs])


def latest_value(s, ts):
    day=pd.Timestamp(ts).tz_convert('UTC').tz_localize(None).normalize()
    a=s[s.index < day].dropna()
    return float(a.iloc[-1]) if len(a) else math.nan


def changes(s, ts):
    cur=latest_value(s,ts)
    return {f'chg_{n}obs': (cur-prior_value(s,ts,n) if np.isfinite(cur) and np.isfinite(prior_value(s,ts,n)) else math.nan) for n in (1,5,20)} | {'level':cur}


def xau_context(xau, ts):
    t=pd.Timestamp(ts)
    a=xau[xau.index < t].dropna()
    if not len(a): return {'xau_level':math.nan,'xau_ret_1d_pct':math.nan,'xau_ret_5d_pct':math.nan,'xau_ret_20d_pct':math.nan}
    cur=float(a.iloc[-1]); out={'xau_level':cur}
    for n in (1,5,20):
        if len(a)>n:
            out[f'xau_ret_{n}d_pct']=(cur/float(a.iloc[-1-n])-1)*100
        else: out[f'xau_ret_{n}d_pct']=math.nan
    return out


def build_driver_shocks(series):
    rows=[]
    for name,s in series.items():
        x=s.dropna().sort_index()
        delta=x.diff()
        absd=delta.abs()
        for i in range(1,len(x)):
            date=x.index[i]
            if date.year not in YEARS: continue
            hist=absd.iloc[max(1,i-DRIVER_LOOKBACK):i].dropna()
            if len(hist)<DRIVER_MIN: continue
            threshold=float(hist.quantile(DRIVER_Q))
            move=float(delta.iloc[i])
            if np.isfinite(move) and abs(move)>=threshold and threshold>0:
                # Daily observation can affect review only after completion. Use next 00:00 UTC.
                lock=pd.Timestamp(date,tz='UTC')+pd.Timedelta(days=1)
                rows.append({'lock_time_utc':lock,'driver':name,'move':move,'abs_move':abs(move),'prior_q95_abs_move':threshold,'source_date':date})
    return pd.DataFrame(rows)


def weekly_locks(xau):
    # Review after the final observed XAU session of every ISO week. Shift 2h past
    # final daily timestamp/close and cap at Saturday 00:00+; exact trade entry is not set here.
    daily=xau.to_frame('xau')
    daily['week']=daily.index.to_period('W-SUN')
    locks=[]
    for _,g in daily.groupby('week'):
        last=g.index.max()
        if last.year in YEARS:
            lock=(last+pd.Timedelta(hours=3)).ceil('1h')
            locks.append(lock)
    return locks


def main():
    if any('2018' in str(p) for p in (OUT,)): raise RuntimeError('PRESERVED_2018_GUARD')
    series={n:load_fred_raw(n) for n in ('DGS2','DFII5','DFII10','DTWEXBGS','VIXCLS')}
    series['GLD_TONNES']=load_gld_raw()
    xau=load_daily_xau(); events=load_events(); shocks=build_driver_shocks(series)

    triggers=defaultdict(lambda:{'weekly':False,'events':[],'driver_shocks':[]})
    for t in weekly_locks(xau): triggers[pd.Timestamp(t)]['weekly']=True
    for e in events.itertuples(index=False):
        triggers[pd.Timestamp(e.event_time_utc)]['events'].append({'event_id':e.event_id,'event_type':e.event_type,'release_period':e.release_period,'official_source':e.official_source})
    for s in shocks.itertuples(index=False):
        triggers[pd.Timestamp(s.lock_time_utc)]['driver_shocks'].append({'driver':s.driver,'move':s.move,'abs_move':s.abs_move,'prior_q95_abs_move':s.prior_q95_abs_move,'source_date':str(s.source_date.date())})

    rows=[]; packet_dir=OUT/'packets'; packet_dir.mkdir(parents=True,exist_ok=True)
    for i,t in enumerate(sorted(triggers)):
        if t.year not in YEARS: continue
        trig=triggers[t]
        packet={
            'review_id':f'RBCL-{i:04d}',
            'lock_time_utc':str(t),
            'trigger_weekly':trig['weekly'],
            'trigger_events':trig['events'],
            'trigger_driver_shocks':trig['driver_shocks'],
            'numeric_context':{},
            'reasoning_output':{
                'STATE':None,'DIRECTION':None,'RESILIENCE':None,'DOMINANT_DRIVER':None,'SECONDARY_DRIVER':None,'MAIN_OPPOSITION':None,'DRIVER_HANDOFF':None,'CONFIDENCE':None,'ACTIONABILITY':None,'EXPECTED_HORIZON':None,'INVALIDATION':None,'NEXT_REVIEW_CONDITION':None,'SUPPORTING_EVIDENCE':[],'CONTRADICTING_EVIDENCE':[],'DOMINANCE_STATEMENT':None
            },
            'source_dossier_required': bool(trig['events'] or trig['driver_shocks']),
            'outcome_scored':False,
        }
        packet['numeric_context'].update(xau_context(xau,t))
        for name,s in series.items():
            c=changes(s,t)
            for k,v in c.items(): packet['numeric_context'][f'{name}_{k}']=v
        path=packet_dir/f"{packet['review_id']}.json"
        path.write_text(json.dumps(packet,indent=2,default=str)+'\n')
        rows.append({'review_id':packet['review_id'],'lock_time_utc':t,'weekly':trig['weekly'],'event_count':len(trig['events']),'driver_shock_count':len(trig['driver_shocks']),'source_dossier_required':packet['source_dossier_required'],'packet_file':str(path.name)})

    cal=pd.DataFrame(rows).sort_values('lock_time_utc')
    cal.to_csv(OUT/'review_calendar.csv',index=False)
    shocks.to_csv(OUT/'driver_shock_triggers.csv',index=False)
    stats={
        'status':'DEVELOPMENT_REVIEW_PACKET_BUILD_ONLY',
        'years':list(YEARS),'preserved_2018_accessed':False,
        'review_count':int(len(cal)),
        'weekly_review_count':int(cal.weekly.sum()),
        'reviews_with_events':int((cal.event_count>0).sum()),
        'scheduled_events_total':int(cal.event_count.sum()),
        'reviews_with_driver_shocks':int((cal.driver_shock_count>0).sum()),
        'driver_shocks_total':int(cal.driver_shock_count.sum()),
        'reviews_requiring_source_dossier':int(cal.source_dossier_required.sum()),
        'reviews_by_year':cal.lock_time_utc.dt.year.value_counts().sort_index().to_dict(),
        'review_trigger_rule':'weekly + all scheduled events + >=95th percentile trailing-prior-252 daily driver changes, min 126 prior observations',
        'warning':'Review trigger selects WHEN to reason only; no direction is derived from trigger signs.'
    }
    (OUT/'build_summary.json').write_text(json.dumps(stats,indent=2,default=str)+'\n')
    print('GOLD_ROLE_BASED_REVIEW_PACKETS_2016_2017_COMPLETE')
    print(json.dumps(stats,indent=2,default=str))
    print('\nDRIVER SHOCK COUNTS')
    print(shocks.driver.value_counts().to_string())
    print('\nFIRST 25 REVIEWS')
    print(cal.head(25).to_string(index=False))

if __name__=='__main__': main()
