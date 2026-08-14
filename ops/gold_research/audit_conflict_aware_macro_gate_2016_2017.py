#!/usr/bin/env python3
"""Conflict-aware continuous macro gate audit on consumed 2016-2017.

Causal correction (not threshold search):
- 2Y + 10Y are ONE rates block, not two independent votes.
- EURUSD is a separate USD block.
- A directional macro-pressure observation exists only when rates block and USD
  block agree in gold direction; disagreement = CONFLICT/FLAT.
- Fixed 6h/24h/72h horizons, same 20-day vol normalization and 6-hour persistence
  as the first continuous monitor.
- Continuous pressure only gates the unchanged V4 core state; it cannot create or
  reverse the core.
- 2016-2017 only. 2018 remains untouched.
"""
from __future__ import annotations
import json, math
from pathlib import Path
import numpy as np
import pandas as pd

ROOT=Path.home()/'.cache/gold_research'
OUT=ROOT/'conflict_aware_gate_2016_2017'
OUT.mkdir(parents=True,exist_ok=True)
YEARS=(2016,2017)
H=(6,24,72)
VOL=24*20
MINVOL=120
PERSIST=6
INSTR={'XAU':'XAU_USD','B02':'USB02Y_USD','B10':'USB10Y_USD','EUR':'EUR_USD'}


def raw_year(inst,year):
    d=ROOT/('oanda_2016' if year==2016 else 'oanda_2017_holdout')
    fs=[]
    for m in range(1,13):
        p=d/f'oanda-{inst}-{year}-{m}.csv'
        x=pd.read_csv(p,usecols=['time','close'])
        x['time']=pd.to_datetime(x.time,utc=True,errors='coerce'); x['close']=pd.to_numeric(x.close,errors='coerce')
        fs.append(x.dropna())
    return pd.concat(fs).drop_duplicates('time',keep='last').sort_values('time').set_index('time').close.astype(float)


def hourly(alias):
    s=pd.concat([raw_year(INSTR[alias],y) for y in YEARS]).sort_index()
    return s.resample('1h').last().ffill(limit=2)


def sign(v):
    return 1 if np.isfinite(v) and v>0 else -1 if np.isfinite(v) and v<0 else 0


def build_continuous():
    p=pd.DataFrame({a:hourly(a) for a in INSTR})
    for a in ('B02','B10','EUR'):
        lr=np.log(p[a]).diff()
        sig=lr.rolling(VOL,min_periods=MINVOL).std().shift(1)
        for h in H:
            p[f'{a}_z{h}']=np.log(p[a]/p[a].shift(h))/(sig*np.sqrt(h))
    rec=[]
    for ts,r in p.iterrows():
        q={'ts':ts}
        hd={}
        for h in H:
            b2=sign(r[f'B02_z{h}']); b10=sign(r[f'B10_z{h}']); usd=sign(r[f'EUR_z{h}'])
            rates=b2 if b2!=0 and b2==b10 else 0
            d=rates if rates!=0 and rates==usd else 0
            hd[h]=d
            q[f'rates_dir_{h}h']=rates; q[f'usd_dir_{h}h']=usd; q[f'joint_dir_{h}h']=d
        # Slow/medium horizons must agree; 6h may be same or unresolved, never opposite.
        cand=hd[24] if hd[24]!=0 and hd[24]==hd[72] and hd[6] in (0,hd[24]) else 0
        q['candidate_dir']=cand
        rec.append(q)
    s=pd.DataFrame(rec).set_index('ts')
    cur=0; rd=0; n=0; states=[]; trans=[]
    for ts,r in s.iterrows():
        c=int(r.candidate_dir)
        if c and c==rd: n+=1
        elif c: rd=c; n=1
        else: rd=0; n=0
        if n>=PERSIST and rd!=cur:
            old=cur; cur=rd; trans.append({'ts':ts,'old_state':old,'new_state':cur})
        states.append(cur)
    s['state']=states
    return p,s,pd.DataFrame(trans)


def core_changes():
    rows=[]
    for f in (ROOT/'prospective_state_machine_2016/exposure_actions.csv', ROOT/'v4_2017_holdout/exposure_actions.csv'):
        x=pd.read_csv(f); x['ts']=pd.to_datetime(x.ts,utc=True)
        x=x[x.reason.astype(str).str.startswith(('START_','REVERSE_'))]
        for r in x.itertuples(index=False): rows.append({'ts':r.ts,'core_state':int(r.exposure),'reason':r.reason,'event_id':r.event_id})
    return pd.DataFrame(rows).sort_values('ts').reset_index(drop=True)


def maxdd(e): return float((e/e.cummax()-1).min())


def score_year(panel,states,changes,year):
    start=pd.Timestamp(f'{year}-01-01T00:00:00Z'); end=pd.Timestamp(f'{year}-12-31T23:59:59Z')
    f=pd.DataFrame(index=states.loc[start:end].index)
    f['continuous']=states.loc[f.index,'state'].astype(int)
    cstate=0; prior=changes[changes.ts<f.index.min()]
    if len(prior): cstate=int(prior.iloc[-1].core_state)
    cy=changes[(changes.ts>=f.index.min())&(changes.ts<=f.index.max())].to_dict('records'); ci=0; cv=[]
    for ts in f.index:
        while ci<len(cy) and cy[ci]['ts']<=ts: cstate=int(cy[ci]['core_state']); ci+=1
        cv.append(cstate)
    f['core']=cv
    f['exposure']=np.where((f.core!=0)&(f.continuous==f.core),f.core,0).astype(int)
    f['xau']=panel['XAU'].loc[start:end].reindex(f.index)
    f=f.dropna(subset=['xau'])
    eq=1.; prev=0; ee=1.; ep=np.nan; open_ts=None; open_px=None; trades=[]; curve=[]
    for ts,r in f.iterrows():
        exp=int(r.exposure); px=float(r.xau)
        if exp!=prev:
            if prev!=0:
                eq=ee*(1+prev*(px/ep-1)); trades.append({'entry_ts':open_ts,'exit_ts':ts,'direction':prev,'simple_return':prev*(px/open_px-1)})
            prev=exp; ee=eq; ep=px if exp else np.nan; open_ts=ts if exp else None; open_px=px if exp else None
        mark=ee*(1+prev*(px/ep-1)) if prev else eq; curve.append(mark)
    if prev!=0:
        px=float(f.xau.iloc[-1]); trades.append({'entry_ts':open_ts,'exit_ts':f.index[-1],'direction':prev,'simple_return':prev*(px/open_px-1)})
    f['equity']=curve; t=pd.DataFrame(trades)
    result={'year':year,'return':float(f.equity.iloc[-1]-1),'max_drawdown':maxdd(f.equity),'always_long':float(f.xau.iloc[-1]/f.xau.iloc[0]-1),'active_fraction':float((f.exposure!=0).mean()),'trades':int(len(t)),'hit_rate':float((t.simple_return>0).mean()) if len(t) else math.nan,'mean_trade':float(t.simple_return.mean()) if len(t) else math.nan,'median_trade':float(t.simple_return.median()) if len(t) else math.nan}
    costs=[]
    for bps in (2,5,10,20):
        costs.append({'year':year,'bps':bps,'net':float((1+(t.simple_return-bps/10000)).prod()-1) if len(t) else math.nan})
    f.to_csv(OUT/f'curve_{year}.csv.gz',compression='gzip'); t.to_csv(OUT/f'trades_{year}.csv',index=False)
    return result,costs


def main():
    if '2018' in str(OUT): raise RuntimeError('PRESERVED_2018_GUARD')
    panel,states,trans=build_continuous(); changes=core_changes()
    results=[]; costs=[]
    for y in YEARS:
        r,c=score_year(panel,states,changes,y); results.append(r); costs+=c
    summary={'status':'POST_HOLDOUT_DEVELOPMENT_ONLY','preserved_2018_accessed':False,'representation':'rates block (2Y+10Y) must agree with independent USD block; conflict=flat; same 6/24/72h + 6h persistence; gate unchanged V4 core','transition_count':int(len(trans)),'transition_count_by_year':trans.ts.dt.year.value_counts().sort_index().to_dict() if len(trans) else {},'years':results}
    states.to_csv(OUT/'continuous_states.csv.gz',compression='gzip'); trans.to_csv(OUT/'continuous_transitions.csv',index=False); changes.to_csv(OUT/'core_changes.csv',index=False); pd.DataFrame(costs).to_csv(OUT/'costs.csv',index=False); (OUT/'summary.json').write_text(json.dumps(summary,indent=2,default=str)+'\n')
    print('GOLD_CONFLICT_AWARE_GATE_2016_2017_COMPLETE')
    print(json.dumps(summary,indent=2,default=str)); print('\nCOSTS'); print(pd.DataFrame(costs).to_string(index=False))

if __name__=='__main__': main()
