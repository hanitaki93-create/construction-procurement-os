#!/usr/bin/env python3
"""Development-only continuous macro-state diagnostic on consumed 2016-2017.

Purpose: test the pre-identified missing V4 component without touching 2018.
No gold return is used to create a state.

Frozen diagnostic representation before output:
- hourly closes from the same Oanda proxies;
- primary mapped channels: 2Y bond price, 10Y bond price, EURUSD;
- fixed macro horizons: 6h / 24h / 72h;
- each horizon return normalized by trailing 20-day hourly volatility;
- candidate direction only when 24h and 72h majority directions agree and 6h is not opposite;
- transition only after six consecutive hourly candidate observations in the same direction.

Gold is measured only AFTER transitions as a diagnostic verdict.
This script is representation diagnosis, not a trading backtest and not V5.
"""
from __future__ import annotations

import json, math
from pathlib import Path
from typing import Dict

import numpy as np
import pandas as pd

YEARS=(2016,2017)
HORIZONS=(6,24,72)
PERSIST_HOURS=6
VOL_LOOKBACK_HOURS=24*20
MIN_VOL_HOURS=120
INSTRUMENTS={
    'XAU':'XAU_USD',
    'B02':'USB02Y_USD',
    'B10':'USB10Y_USD',
    'EUR':'EUR_USD',
    'SPX':'SPX500_USD',
}
PRIMARY=('B02','B10','EUR')


def load_raw_year(data_dir: Path, instrument: str, year: int) -> pd.Series:
    frames=[]
    for m in range(1,13):
        p=data_dir / f'oanda-{instrument}-{year}-{m}.csv'
        if not p.exists():
            raise FileNotFoundError(p)
        d=pd.read_csv(p,usecols=['time','close'])
        d['time']=pd.to_datetime(d['time'],utc=True,errors='coerce')
        d['close']=pd.to_numeric(d['close'],errors='coerce')
        frames.append(d.dropna())
    x=pd.concat(frames,ignore_index=True).drop_duplicates('time',keep='last').sort_values('time').set_index('time')['close'].astype(float)
    return x


def load_hourly(alias: str) -> pd.Series:
    inst=INSTRUMENTS[alias]
    parts=[]
    for y in YEARS:
        d=Path.home()/f'.cache/gold_research/oanda_{y}'
        if y==2017:
            d=Path.home()/'.cache/gold_research/oanda_2017_holdout'
        parts.append(load_raw_year(d,inst,y))
    raw=pd.concat(parts).sort_index()
    # Use last observed quote in each hour. Fill at most 2 hours, never through weekends.
    h=raw.resample('1h').last().ffill(limit=2)
    h.name=alias
    return h


def dir3(vals: list[float]) -> int:
    signs=[1 if np.isfinite(v) and v>0 else -1 if np.isfinite(v) and v<0 else 0 for v in vals]
    pos=sum(s>0 for s in signs); neg=sum(s<0 for s in signs)
    return 1 if pos>=2 else -1 if neg>=2 else 0


def main():
    out=Path.home()/'.cache/gold_research/continuous_macro_state_2016_2017'
    out.mkdir(parents=True,exist_ok=True)
    if '2018' in str(out): raise RuntimeError('PRESERVED_2018_GUARD')

    hourly={a:load_hourly(a) for a in INSTRUMENTS}
    idx=hourly['XAU'].index
    panel=pd.DataFrame({a:s.reindex(idx) for a,s in hourly.items()})

    # Trailing 1h volatility, strictly lagged one hour.
    zcols={}
    for a in PRIMARY:
        lr=np.log(panel[a]).diff()
        sig=lr.rolling(VOL_LOOKBACK_HOURS,min_periods=MIN_VOL_HOURS).std().shift(1)
        for h in HORIZONS:
            r=np.log(panel[a]/panel[a].shift(h))
            z=r/(sig*np.sqrt(h))
            zcols[(a,h)]=z
            panel[f'{a}_z{h}h']=z

    rows=[]
    for ts,row in panel.iterrows():
        rec={'ts':ts}
        dirs={}
        nets={}
        for h in HORIZONS:
            vals=[row[f'{a}_z{h}h'] for a in PRIMARY]
            d=dir3(vals)
            net=float(np.nansum(vals)) if any(np.isfinite(v) for v in vals) else math.nan
            dirs[h]=d; nets[h]=net
            rec[f'dir_{h}h']=d; rec[f'net_z_{h}h']=net
        cand=dirs[24] if dirs[24]!=0 and dirs[24]==dirs[72] and dirs[6] in (0,dirs[24]) else 0
        rec['candidate_dir']=cand
        rows.append(rec)
    states=pd.DataFrame(rows).set_index('ts')

    # Six consecutive hourly candidate observations required. Missing/zero resets count.
    current=0; run_dir=0; run_n=0; transitions=[]; persistent=[]
    for ts,r in states.iterrows():
        c=int(r.candidate_dir)
        if c!=0 and c==run_dir:
            run_n+=1
        elif c!=0:
            run_dir=c; run_n=1
        else:
            run_dir=0; run_n=0
        if run_n>=PERSIST_HOURS and run_dir!=current:
            old=current; current=run_dir
            transitions.append({'ts':ts,'old_state':old,'new_state':current,'candidate_run_hours':run_n})
        persistent.append(current)
    states['state']=persistent
    transitions=pd.DataFrame(transitions)

    # Post-transition gold verdict only; never used in creation.
    if len(transitions):
        xau=panel['XAU']
        verdict=[]
        for i,t in transitions.iterrows():
            ts=t.ts; d=int(t.new_state)
            rec=t.to_dict()
            p0=xau.loc[ts] if ts in xau.index else np.nan
            for h in (6,24,72,120,240):
                t1=ts+pd.Timedelta(hours=h)
                p1=xau.reindex(xau.index.union([t1])).sort_index().ffill(limit=2).loc[t1] if t1<=xau.index.max() else np.nan
                raw=(p1/p0-1)*100 if np.isfinite(p0) and p0>0 and np.isfinite(p1) else np.nan
                rec[f'xau_signed_{h}h_pct']=d*raw if np.isfinite(raw) else np.nan
            verdict.append(rec)
        transitions=pd.DataFrame(verdict)

    # Episode diagnostic from transition to next transition, no execution claim.
    episodes=[]
    if len(transitions):
        xau=panel['XAU']
        for i,r in transitions.iterrows():
            start=r.ts
            end=transitions.iloc[i+1].ts if i+1<len(transitions) else xau.dropna().index.max()
            p0=xau.loc[start] if start in xau.index else np.nan
            p1=xau.loc[end] if end in xau.index else np.nan
            ret=int(r.new_state)*(p1/p0-1) if np.isfinite(p0) and p0>0 and np.isfinite(p1) else np.nan
            episodes.append({'entry_ts':start,'exit_ts':end,'direction':int(r.new_state),'simple_return':ret,'days':(end-start)/pd.Timedelta(days=1)})
    episodes=pd.DataFrame(episodes)

    summary={
        'status':'DEVELOPMENT_DIAGNOSTIC_ONLY',
        'years':[2016,2017],
        'preserved_2018_accessed':False,
        'horizons_hours':HORIZONS,
        'persistence_hours':PERSIST_HOURS,
        'transition_count':int(len(transitions)),
        'transition_count_by_year':transitions.ts.dt.year.value_counts().sort_index().to_dict() if len(transitions) else {},
        'median_episode_days':float(episodes.days.median()) if len(episodes) else math.nan,
        'episode_signed_mean':float(episodes.simple_return.mean()) if len(episodes) else math.nan,
        'episode_hit_rate':float((episodes.simple_return>0).mean()) if len(episodes) else math.nan,
        'warning':'Gold is used only for post-transition diagnostic scoring; state creation uses macro channels only.'
    }
    states.to_csv(out/'hourly_macro_state.csv.gz',compression='gzip')
    transitions.to_csv(out/'transitions.csv',index=False)
    episodes.to_csv(out/'episodes.csv',index=False)
    (out/'summary.json').write_text(json.dumps(summary,indent=2,default=str)+'\n')

    print('GOLD_CONTINUOUS_MACRO_STATE_2016_2017_COMPLETE')
    print('\nTRANSITIONS')
    print(transitions.to_string(index=False) if len(transitions) else 'NONE')
    print('\nEPISODES')
    print(episodes.to_string(index=False) if len(episodes) else 'NONE')
    print('\nSUMMARY')
    print(json.dumps(summary,indent=2,default=str))

if __name__=='__main__':
    main()
