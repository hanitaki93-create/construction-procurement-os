#!/usr/bin/env python3
"""Score frozen V5 slow-state validity veto on consumed 2016-2017.

Protocol source: TRADABILITY_GATE_V5_SLOW_VALIDITY_PROTOCOL.md
No parameter search. No 2018 market data access.
"""
from __future__ import annotations
import json, math
from pathlib import Path
import numpy as np
import pandas as pd

ROOT=Path.home()/'.cache/gold_research'
PROBE=ROOT/'full_upper_layer_probe'
OUT=ROOT/'v5_slow_validity_2016_2017'
OUT.mkdir(parents=True,exist_ok=True)
YEARS=(2016,2017)
LOOKBACK=20


def load_slow_panel():
    parts=[]
    for n in ('DGS2','DFII5','DFII10','DTWEXBGS','VIXCLS'):
        x=pd.read_csv(PROBE/f'{n}_2016_2017.csv')
        x['date']=pd.to_datetime(x['date']); x[n]=pd.to_numeric(x[n],errors='coerce')
        x=x.set_index('date')[[n]]; parts.append(x)
    g=pd.read_csv(PROBE/'gld_official_2016_2017.csv')
    g['date']=pd.to_datetime(g['parsed_date']); g['GLD_TONNES']=pd.to_numeric(g['Tonnes of Gold'],errors='coerce')
    parts.append(g.set_index('date')[['GLD_TONNES']])
    p=pd.concat(parts,axis=1).sort_index()
    # Retain actual business observations; modest ffill handles source holidays only.
    p=p.ffill(limit=3)
    p=p[p['GLD_TONNES'].notna()]
    return p


def sgn(v):
    return 1 if np.isfinite(v) and v>0 else -1 if np.isfinite(v) and v<0 else 0


def slow_decisions(panel):
    rows=[]
    for i in range(LOOKBACK,len(panel)):
        cur=panel.iloc[i]; prev=panel.iloc[i-LOOKBACK]; date=panel.index[i]
        d5=cur.DFII5-prev.DFII5; d10=cur.DFII10-prev.DFII10
        # Yield DOWN supports gold; yield UP opposes gold.
        if np.isfinite(d5) and np.isfinite(d10) and d5<0 and d10<0: O=1
        elif np.isfinite(d5) and np.isfinite(d10) and d5>0 and d10>0: O=-1
        else: O=0
        du=cur.DTWEXBGS-prev.DTWEXBGS
        D=-sgn(du)  # USD down => gold supportive
        dq=cur.GLD_TONNES-prev.GLD_TONNES
        Q=sgn(dq)
        dv=cur.VIXCLS-prev.VIXCLS
        rows.append({'date':date,'O':O,'D':D,'Q':Q,'VIX_change_20':dv,'DFII5_change_20':d5,'DFII10_change_20':d10,'USD_change_20':du,'GLD_tonnes_change_20':dq})
    return pd.DataFrame(rows)


def load_xau(year):
    d=ROOT/('oanda_2016' if year==2016 else 'oanda_2017_holdout')
    fs=[]
    for m in range(1,13):
        p=d/f'oanda-XAU_USD-{year}-{m}.csv'
        x=pd.read_csv(p,usecols=['time','close']); x['time']=pd.to_datetime(x.time,utc=True,errors='coerce'); x['close']=pd.to_numeric(x.close,errors='coerce'); fs.append(x.dropna())
    return pd.concat(fs).drop_duplicates('time',keep='last').sort_values('time').set_index('time').close.astype(float)


def load_v4_actions(year):
    p=ROOT/('prospective_state_machine_2016/exposure_actions.csv' if year==2016 else 'v4_2017_holdout/exposure_actions.csv')
    a=pd.read_csv(p); a['ts']=pd.to_datetime(a.ts,utc=True); return a.sort_values('ts')


def core_changes_all():
    rows=[]
    for year in YEARS:
        a=load_v4_actions(year)
        for r in a[a.reason.astype(str).str.startswith(('START_','REVERSE_'))].itertuples(index=False):
            rows.append({'ts':r.ts,'core_state':int(r.exposure),'reason':r.reason,'event_id':r.event_id})
    return pd.DataFrame(rows).sort_values('ts').reset_index(drop=True)


def maxdd(e): return float((e/e.cummax()-1).min())


def next_quote_after(xau, ts):
    pos=xau.index.searchsorted(ts,side='left')
    return xau.index[pos] if pos<len(xau) else pd.NaT


def build_year(year,panel,decisions,core_changes):
    xau=load_xau(year)
    actions=load_v4_actions(year)
    start=xau.index.min(); end=xau.index.max()

    # Core state timeline changes (persistent even across V4 temporary flat actions).
    prior=core_changes[core_changes.ts<start]
    initial_core=int(prior.iloc[-1].core_state) if len(prior) else 0
    cy=core_changes[(core_changes.ts>=start)&(core_changes.ts<=end)].to_dict('records')

    # Convert daily completed-data decisions into conservative next-day quote timestamps.
    sd=decisions[(decisions.date.dt.year==year)].copy()
    slow_actions=[]
    for r in sd.itertuples(index=False):
        # after completed daily values; no same-close fill
        earliest=pd.Timestamp(r.date,tz='UTC')+pd.Timedelta(days=1)
        qts=next_quote_after(xau,earliest)
        if pd.isna(qts): continue
        slow_actions.append({'ts':qts,'O':int(r.O),'D':int(r.D),'Q':int(r.Q),'date':r.date,'VIX_change_20':r.VIX_change_20})
    slow_actions=pd.DataFrame(slow_actions).drop_duplicates('ts',keep='last').sort_values('ts')

    # Make one chronological action stream: V4 exposure actions, core state changes,
    # and slow decisions. Re-evaluate final exposure after every item.
    stream=[]
    for r in actions.itertuples(index=False): stream.append((r.ts,0,'v4',r))
    for r in cy: stream.append((r['ts'],1,'core',r))
    for r in slow_actions.to_dict('records'): stream.append((r['ts'],2,'slow',r))
    stream.sort(key=lambda z:(z[0],z[1]))

    v4_exp=0
    # For 2017 carry-in action sets V4 exposure at first quote; for 2016 it remains 0 until START.
    core=initial_core
    O=D=Q=0
    final_exp=0
    final_actions=[]

    def valid(c):
        if c==0: return False,0
        opp=sum(1 for b in (O,D,Q) if b==-c)
        return opp<2,opp

    for ts,_,kind,obj in stream:
        if kind=='v4':
            v4_exp=int(obj.exposure)
        elif kind=='core':
            core=int(obj['core_state'])
        else:
            O=int(obj['O']); D=int(obj['D']); Q=int(obj['Q'])
        ok,opp=valid(core)
        desired=v4_exp if (v4_exp!=0 and np.sign(v4_exp)==core and ok) else 0
        if desired!=final_exp:
            final_actions.append({'ts':ts,'from_exposure':final_exp,'to_exposure':desired,'v4_exposure':v4_exp,'core_state':core,'O':O,'D':D,'Q':Q,'opposing_blocks':opp,'trigger_kind':kind})
            final_exp=desired

    fa=pd.DataFrame(final_actions)
    # Build mark-to-market on actual XAU quotes.
    equity=1.; prev=0; ee=1.; ep=np.nan; open_ts=None; open_px=None; ai=0; ars=fa.to_dict('records'); curve=[]; trades=[]
    for ts,px0 in xau.items():
        px=float(px0)
        while ai<len(ars) and ars[ai]['ts']<=ts:
            a=ars[ai]
            if prev!=0:
                equity=ee*(1+prev*(px/ep-1))
                trades.append({'entry_ts':open_ts,'exit_ts':ts,'direction':prev,'simple_return':prev*(px/open_px-1)})
            prev=int(a['to_exposure']); ee=equity; ep=px if prev else np.nan; open_ts=ts if prev else None; open_px=px if prev else None
            ai+=1
        mark=ee*(1+prev*(px/ep-1)) if prev else equity
        curve.append((ts,px,prev,mark))
    if prev!=0:
        px=float(xau.iloc[-1]); ts=xau.index[-1]
        equity=ee*(1+prev*(px/ep-1)); trades.append({'entry_ts':open_ts,'exit_ts':ts,'direction':prev,'simple_return':prev*(px/open_px-1)})
    c=pd.DataFrame(curve,columns=['ts','xau','exposure','equity']).set_index('ts'); t=pd.DataFrame(trades)
    ret=float(c.equity.iloc[-1]-1); dd=maxdd(c.equity); al=float(xau.iloc[-1]/xau.iloc[0]-1); active=float((c.exposure!=0).mean())
    if len(t):
        hit=float((t.simple_return>0).mean()); mean=float(t.simple_return.mean()); med=float(t.simple_return.median()); best=t.simple_return.idxmax(); without=float((1+t.drop(best).simple_return).prod()-1) if len(t)>1 else 0.
    else: hit=mean=med=without=math.nan
    costs=[]
    for bps in (2,5,10,20): costs.append({'year':year,'bps':bps,'net':float((1+(t.simple_return-bps/10000)).prod()-1) if len(t) else math.nan})
    c.to_csv(OUT/f'curve_{year}.csv.gz',compression='gzip'); t.to_csv(OUT/f'trades_{year}.csv',index=False); fa.to_csv(OUT/f'final_actions_{year}.csv',index=False); slow_actions.to_csv(OUT/f'slow_actions_{year}.csv',index=False)
    return {'year':year,'return':ret,'max_drawdown':dd,'always_long':al,'active_fraction':active,'trade_episodes':int(len(t)),'hit_rate':hit,'mean_trade':mean,'median_trade':med,'compound_without_best':without},costs


def main():
    if '2018' in str(OUT): raise RuntimeError('PRESERVED_2018_GUARD')
    panel=load_slow_panel(); decisions=slow_decisions(panel); changes=core_changes_all()
    results=[]; costs=[]
    for y in YEARS:
        r,c=build_year(y,panel,decisions,changes); results.append(r); costs+=c
    summary={'status':'POST_V4_HOLDOUT_DEVELOPMENT_ONLY','preserved_2018_accessed':False,'protocol':'V5 slow validity: 20-observation O(real yields)/D(USD)/Q(GLD), flat when >=2 independent blocks oppose unchanged V4 core; next-day slow-data execution','years':results}
    decisions.to_csv(OUT/'slow_decision_panel.csv',index=False); changes.to_csv(OUT/'core_changes.csv',index=False); pd.DataFrame(costs).to_csv(OUT/'costs.csv',index=False); (OUT/'summary.json').write_text(json.dumps(summary,indent=2,default=str)+'\n')
    print('GOLD_V5_SLOW_VALIDITY_2016_2017_COMPLETE'); print(json.dumps(summary,indent=2,default=str)); print('\nCOSTS'); print(pd.DataFrame(costs).to_string(index=False))

if __name__=='__main__': main()
