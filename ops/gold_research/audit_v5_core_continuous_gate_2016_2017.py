#!/usr/bin/env python3
"""V5 candidate integration audit on consumed 2016-2017 only.

No threshold tuning. Uses:
- unchanged V4 confirmed core START/REVERSE actions;
- unchanged first-pass continuous macro state (6/24/72h, 6h persistence);
- continuous state may GATE exposure but may not create/reverse the core state.

Exposure rule:
  exposure = core_state when continuous_state == core_state, otherwise FLAT.

This is post-2017-failure development and cannot validate V5. 2018 is untouched.
"""
from __future__ import annotations

import json, math
from pathlib import Path
import numpy as np
import pandas as pd

ROOT=Path.home()/'.cache/gold_research'
CONT=ROOT/'continuous_macro_state_2016_2017/hourly_macro_state.csv.gz'
A16=ROOT/'prospective_state_machine_2016/exposure_actions.csv'
A17=ROOT/'v4_2017_holdout/exposure_actions.csv'
OUT=ROOT/'v5_core_continuous_gate_2016_2017'
OUT.mkdir(parents=True,exist_ok=True)


def load_xau():
    parts=[]
    for y,d in [(2016,ROOT/'oanda_2016'),(2017,ROOT/'oanda_2017_holdout')]:
        frames=[]
        for m in range(1,13):
            p=d/f'oanda-XAU_USD-{y}-{m}.csv'
            q=pd.read_csv(p,usecols=['time','close'])
            q['time']=pd.to_datetime(q.time,utc=True,errors='coerce')
            q['close']=pd.to_numeric(q.close,errors='coerce')
            frames.append(q.dropna())
        raw=pd.concat(frames).drop_duplicates('time',keep='last').sort_values('time').set_index('time').close.astype(float)
        parts.append(raw)
    return pd.concat(parts).sort_index()


def core_changes():
    rows=[]
    a16=pd.read_csv(A16); a16['ts']=pd.to_datetime(a16.ts,utc=True)
    a17=pd.read_csv(A17); a17['ts']=pd.to_datetime(a17.ts,utc=True)
    for df in (a16,a17):
        x=df[df.reason.astype(str).str.startswith(('START_','REVERSE_'))]
        for r in x.itertuples(index=False):
            rows.append({'ts':r.ts,'core_state':int(r.exposure),'reason':r.reason,'event_id':r.event_id})
    # V4 carry-in means core state is -1 at 2017 start; this already follows from the
    # Aug-2016 reversal because the core state persists until the next core change.
    return pd.DataFrame(rows).sort_values('ts').reset_index(drop=True)


def maxdd(eq):
    return float((eq/eq.cummax()-1).min())


def build_year(xau, cont, changes, year):
    start=pd.Timestamp(f'{year}-01-01T00:00:00Z'); end=pd.Timestamp(f'{year}-12-31T23:59:59Z')
    idx=cont.loc[start:end].index
    frame=pd.DataFrame(index=idx)
    frame['continuous_state']=cont.loc[idx,'state'].astype(int)

    # Core state is the latest confirmed V4 core change, including prior-year carry.
    c=pd.Series(index=idx,dtype=float)
    state=0
    prior=changes[changes.ts < idx.min()]
    if len(prior): state=int(prior.iloc[-1].core_state)
    changes_y=changes[(changes.ts>=idx.min())&(changes.ts<=idx.max())]
    ci=0
    recs=changes_y.to_dict('records')
    vals=[]
    for ts in idx:
        while ci<len(recs) and recs[ci]['ts']<=ts:
            state=int(recs[ci]['core_state']); ci+=1
        vals.append(state)
    frame['core_state']=vals
    frame['exposure']=np.where((frame.core_state!=0)&(frame.continuous_state==frame.core_state),frame.core_state,0).astype(int)

    # Hourly XAU marks. Use last observed quote each hour, max 2h fill.
    h=xau.loc[start:end].resample('1h').last().ffill(limit=2).reindex(idx)
    frame['xau']=h
    frame=frame.dropna(subset=['xau'])

    # Build equity: 1x spot directional exposure, changes at hourly state observation.
    equity=1.0; prev_exp=0; entry_eq=1.0; entry_px=np.nan; eq=[]; actions=[]; trades=[]
    open_ts=None; open_px=None; open_dir=0
    for ts,r in frame.iterrows():
        exp=int(r.exposure); px=float(r.xau)
        if exp!=prev_exp:
            if prev_exp!=0 and np.isfinite(entry_px):
                equity=entry_eq*(1+prev_exp*(px/entry_px-1))
                trades.append({'entry_ts':open_ts,'exit_ts':ts,'direction':prev_exp,'simple_return':prev_exp*(px/open_px-1)})
            actions.append({'ts':ts,'from_exposure':prev_exp,'to_exposure':exp,'core_state':int(r.core_state),'continuous_state':int(r.continuous_state),'xau':px})
            if exp!=0:
                entry_eq=equity; entry_px=px; open_ts=ts; open_px=px; open_dir=exp
            else:
                entry_eq=equity; entry_px=np.nan; open_ts=None; open_px=None; open_dir=0
            prev_exp=exp
        mark=entry_eq*(1+prev_exp*(px/entry_px-1)) if prev_exp!=0 and np.isfinite(entry_px) else equity
        eq.append(mark)
    frame['equity']=eq
    # accounting close at last mark
    if prev_exp!=0:
        px=float(frame.xau.iloc[-1]); ts=frame.index[-1]
        trades.append({'entry_ts':open_ts,'exit_ts':ts,'direction':prev_exp,'simple_return':prev_exp*(px/open_px-1)})

    trades=pd.DataFrame(trades); actions=pd.DataFrame(actions)
    ret=float(frame.equity.iloc[-1]-1)
    benchmark=float(frame.xau.iloc[-1]/frame.xau.iloc[0]-1)
    active=float((frame.exposure!=0).mean())
    md=maxdd(frame.equity)
    costs=[]
    for bps in (2,5,10,20):
        if len(trades):
            net=float((1+(trades.simple_return-bps/10000)).prod()-1)
        else: net=math.nan
        costs.append({'year':year,'cost_bps':bps,'net_compound':net})
    s={
        'year':year,'return':ret,'max_drawdown':md,'always_long':benchmark,'active_fraction':active,
        'trade_episodes':int(len(trades)),'hit_rate':float((trades.simple_return>0).mean()) if len(trades) else math.nan,
        'mean_trade':float(trades.simple_return.mean()) if len(trades) else math.nan,
        'median_trade':float(trades.simple_return.median()) if len(trades) else math.nan,
    }
    frame.to_csv(OUT/f'curve_{year}.csv.gz',compression='gzip')
    trades.to_csv(OUT/f'trades_{year}.csv',index=False)
    actions.to_csv(OUT/f'actions_{year}.csv',index=False)
    return s,costs


def main():
    if '2018' in str(OUT): raise RuntimeError('PRESERVED_2018_GUARD')
    cont=pd.read_csv(CONT,index_col=0,parse_dates=True)
    cont.index=pd.to_datetime(cont.index,utc=True)
    xau=load_xau(); changes=core_changes()
    summaries=[]; costrows=[]
    for y in (2016,2017):
        s,c=build_year(xau,cont,changes,y); summaries.append(s); costrows.extend(c)
    summary={
        'status':'POST_HOLDOUT_DEVELOPMENT_ONLY',
        'preserved_2018_accessed':False,
        'rule':'exposure=core only when continuous macro state agrees; continuous state cannot create/reverse core',
        'years':summaries,
    }
    changes.to_csv(OUT/'core_changes.csv',index=False)
    pd.DataFrame(costrows).to_csv(OUT/'cost_sensitivity.csv',index=False)
    (OUT/'summary.json').write_text(json.dumps(summary,indent=2,default=str)+'\n')
    print('GOLD_V5_CORE_CONTINUOUS_GATE_2016_2017_COMPLETE')
    print('\nCORE CHANGES')
    print(changes.to_string(index=False))
    print('\nSUMMARY')
    print(json.dumps(summary,indent=2,default=str))
    print('\nCOSTS')
    print(pd.DataFrame(costrows).to_string(index=False))

if __name__=='__main__': main()
