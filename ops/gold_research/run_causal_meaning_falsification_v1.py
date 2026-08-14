#!/usr/bin/env python3
"""Gold upper-layer causal meaning falsification V1.

Development-only audit on consumed 2016-2017. No 2018 gold access.
Tests individual meanings before any new combined strategy:
  M1 real yields
  M2 broad USD
  M3 GLD participation
  M4 reaction rejection
  M5 participation confirmation at q95 macro events
"""
from __future__ import annotations

import json, math
from pathlib import Path
import numpy as np
import pandas as pd
from scipy.stats import spearmanr
import statsmodels.api as sm

HOME=Path.home()
UP=HOME/'.cache/gold_research/full_upper_layer_probe'
OANDA={2016:HOME/'.cache/gold_research/oanda_2016',2017:HOME/'.cache/gold_research/oanda_2017_holdout'}
LEDGER={2016:HOME/'.cache/gold_research/prospective_state_machine_2016/event_state_ledger.csv',2017:HOME/'.cache/gold_research/v4_2017_holdout/event_state_ledger.csv'}
OUT=HOME/'.cache/gold_research/causal_meaning_falsification_v1'
YEARS=(2016,2017)
LOOKBACKS=(1,5,20)
HORIZONS=(1,5,20)
EVENT_FORWARDS=(60,240)


def guard():
    paths=[str(UP),*[str(x) for x in OANDA.values()],*[str(x) for x in LEDGER.values()],str(OUT)]
    if any('2018' in p for p in paths): raise RuntimeError('PRESERVED_2018_PATH_GUARD')


def read_series(name,col):
    d=pd.read_csv(UP/name)
    d['date']=pd.to_datetime(d['date'])
    d[col]=pd.to_numeric(d[col],errors='coerce')
    return d.set_index('date')[col].sort_index()


def build_daily():
    r5=read_series('DFII5_2016_2017.csv','DFII5')
    r10=read_series('DFII10_2016_2017.csv','DFII10')
    usd=read_series('DTWEXBGS_2016_2017.csv','DTWEXBGS')
    vix=read_series('VIXCLS_2016_2017.csv','VIXCLS')
    g=pd.read_csv(UP/'gld_official_2016_2017.csv')
    g['date']=pd.to_datetime(g['parsed_date'])
    g['gold']=pd.to_numeric(g['Closing Price'],errors='coerce')
    g['tonnes']=pd.to_numeric(g['Tonnes of Gold'],errors='coerce')
    g=g.set_index('date')[['gold','tonnes']].sort_index()
    m=g.join(pd.concat([r5,r10,usd,vix],axis=1),how='left')
    m=m[m.gold.notna()].copy()
    for c in ['DFII5','DFII10','DTWEXBGS','VIXCLS']:
        m[c]=m[c].ffill(limit=3)
    m['real_avg']=(m.DFII5+m.DFII10)/2
    for L in LOOKBACKS:
        # contemporaneous translation pressures
        m[f'real_now_{L}']=-(m.real_avg-m.real_avg.shift(L))
        m[f'usd_now_{L}']=-np.log(m.DTWEXBGS/m.DTWEXBGS.shift(L))
        m[f'etf_now_{L}']=np.log(m.tonnes/m.tonnes.shift(L))
        m[f'gold_past_{L}']=np.log(m.gold/m.gold.shift(L))
        # conservative one-business-day latency before forward prediction
        m[f'real_p_{L}']=m[f'real_now_{L}'].shift(1)
        m[f'usd_p_{L}']=m[f'usd_now_{L}'].shift(1)
        m[f'etf_p_{L}']=m[f'etf_now_{L}'].shift(1)
        m[f'prior_gold_{L}']=m[f'gold_past_{L}'].shift(1)
    for H in HORIZONS:
        m[f'fwd_gold_{H}']=np.log(m.gold.shift(-H)/m.gold)
    return m


def hac_univar(d,xcol,ycol,H):
    z=d[[xcol,ycol]].dropna()
    if len(z)<30:return None
    rho,rp=spearmanr(z[xcol],z[ycol])
    sx=z[xcol].std(ddof=0)
    x=(z[xcol]-z[xcol].mean())/sx if sx>0 else z[xcol]*0
    fit=sm.OLS(z[ycol],sm.add_constant(x)).fit(cov_type='HAC',cov_kwds={'maxlags':max(1,H)})
    qlo,qhi=z[xcol].quantile([.3,.7])
    contrast=z.loc[z[xcol]>=qhi,ycol].mean()-z.loc[z[xcol]<=qlo,ycol].mean()
    hit=(np.sign(z[xcol])*np.sign(z[ycol])>0).mean()
    return dict(n=len(z),rho=float(rho),rho_p=float(rp),beta_std=float(fit.params.iloc[1]),t=float(fit.tvalues.iloc[1]),p_hac=float(fit.pvalues.iloc[1]),high_low=float(contrast),hit=float(hit))


def daily_claims(m):
    rows=[]; cont=[]
    for claim,prefix in [('M1_REAL','real'),('M2_USD','usd'),('M3_ETF','etf')]:
        for L in LOOKBACKS:
            for yr in [2016,2017,'pooled']:
                d=m if yr=='pooled' else m[m.index.year==yr]
                z=d[[f'{prefix}_now_{L}',f'gold_past_{L}']].dropna()
                rho,p=spearmanr(z.iloc[:,0],z.iloc[:,1]) if len(z)>=30 else (np.nan,np.nan)
                cont.append(dict(claim=claim,L=L,period=yr,n=len(z),rho_contemp=rho,p_contemp=p,hit_contemp=float((np.sign(z.iloc[:,0])*np.sign(z.iloc[:,1])>0).mean()) if len(z) else np.nan))
            for H in HORIZONS:
                for yr in [2016,2017,'pooled']:
                    d=m if yr=='pooled' else m[m.index.year==yr]
                    s=hac_univar(d,f'{prefix}_p_{L}',f'fwd_gold_{H}',H)
                    if s: rows.append(dict(claim=claim,L=L,H=H,period=yr,**s))
    return pd.DataFrame(cont),pd.DataFrame(rows)


def joint_claims(m):
    rows=[]
    for L,H in [(5,5),(20,20),(5,20),(20,5)]:
        xs=[f'real_p_{L}',f'usd_p_{L}',f'etf_p_{L}',f'prior_gold_{L}']
        for yr in [2016,2017,'pooled']:
            d=m if yr=='pooled' else m[m.index.year==yr]
            z=d[[f'fwd_gold_{H}']+xs].dropna().copy()
            X=pd.DataFrame(index=z.index)
            for c in xs:
                sd=z[c].std(ddof=0); X[c]=(z[c]-z[c].mean())/sd if sd>0 else 0
            fit=sm.OLS(z[f'fwd_gold_{H}'],sm.add_constant(X)).fit(cov_type='HAC',cov_kwds={'maxlags':H})
            row=dict(L=L,H=H,period=yr,n=len(z))
            for c in xs:
                key='MOM' if c.startswith('prior_gold') else ('REAL' if c.startswith('real') else 'USD' if c.startswith('usd') else 'ETF')
                row[f'{key}_beta']=float(fit.params[c]); row[f'{key}_t']=float(fit.tvalues[c]); row[f'{key}_p']=float(fit.pvalues[c])
            rows.append(row)
    return pd.DataFrame(rows)


def load_xau(year):
    frames=[]
    for mo in range(1,13):
        p=OANDA[year]/f'oanda-XAU_USD-{year}-{mo}.csv'
        d=pd.read_csv(p,usecols=['time','close'])
        d['time']=pd.to_datetime(d.time,utc=True,errors='coerce'); d['close']=pd.to_numeric(d.close,errors='coerce')
        frames.append(d.dropna())
    x=pd.concat(frames,ignore_index=True).drop_duplicates('time',keep='last').sort_values('time').set_index('time').close
    return x


def asof(s,ts,max_age_min=30):
    pos=s.index.searchsorted(ts,side='right')-1
    if pos<0:return np.nan
    t=s.index[pos]
    if (ts-t)/pd.Timedelta(minutes=1)>max_age_min:return np.nan
    return float(s.iloc[pos])


def event_claims(m):
    allrows=[]
    for yr in YEARS:
        xau=load_xau(yr)
        led=pd.read_csv(LEDGER[yr]); led['event_time_utc']=pd.to_datetime(led.event_time_utc,utc=True); led=led[led.aligned==True].copy()
        for r in led.itertuples(index=False):
            t0=r.event_time_utc; ta=t0+pd.Timedelta(minutes=int(r.T_align_min)); direction=int(r.signal_dir)
            p0=asof(xau,t0-pd.Timedelta(minutes=1),30); pa=asof(xau,ta,5)
            init=(pa/p0-1)*100 if np.isfinite(p0) and np.isfinite(pa) and p0>0 else np.nan
            rec=dict(year=yr,event_id=r.event_id,event_type=r.event_type,event_time_utc=t0,T_align_min=int(r.T_align_min),signal_dir=direction,initial_gold_pct=init,initial_macro_signed_pct=direction*init if np.isfinite(init) else np.nan)
            for fw in EVENT_FORWARDS:
                pf=asof(xau,ta+pd.Timedelta(minutes=fw),30)
                raw=(pf/pa-1)*100 if np.isfinite(pa) and np.isfinite(pf) and pa>0 else np.nan
                rec[f'fwd_{fw}m_pct']=raw; rec[f'macro_signed_{fw}m_pct']=direction*raw if np.isfinite(raw) else np.nan
            # participation known only through previous business day
            d=pd.Timestamp(t0.date()); prior=m.index[m.index<d]
            if len(prior):
                pdx=prior[-1]
                for L in (1,5,20):
                    loc=m.index.get_loc(pdx)
                    if loc>=L:
                        ch=float(m.tonnes.iloc[loc]-m.tonnes.iloc[loc-L])
                        rec[f'etfchg_{L}']=ch
                        rec[f'etf_relation_{L}']='CONFIRM' if ch*direction>0 else 'OPPOSE' if ch*direction<0 else 'NEUTRAL'
            allrows.append(rec)
    ev=pd.DataFrame(allrows)
    # M4 rejection summaries
    m4=[]
    for yr in [2016,2017,'pooled']:
        d=ev if yr=='pooled' else ev[ev.year==yr]
        for scope,sub in [('SYMMETRIC',d),('BEARISH_ONLY',d[d.signal_dir==-1])]:
            if scope=='SYMMETRIC': rejected=sub.initial_macro_signed_pct<=0
            else: rejected=sub.initial_gold_pct>=0
            for lab,mask in [('REJECT',rejected),('FOLLOW',~rejected)]:
                g=sub[mask]
                row=dict(period=yr,scope=scope,group=lab,n=len(g),mean_initial_gold_pct=g.initial_gold_pct.mean())
                for fw in EVENT_FORWARDS:
                    if scope=='SYMMETRIC': vals=-g[f'macro_signed_{fw}m_pct'] if lab=='REJECT' else g[f'macro_signed_{fw}m_pct']
                    else: vals=g[f'fwd_{fw}m_pct'] if lab=='REJECT' else -g[f'fwd_{fw}m_pct']
                    row[f'mean_expected_{fw}m_pct']=vals.mean(); row[f'hit_expected_{fw}m']=float((vals>0).mean()) if len(vals.dropna()) else np.nan
                m4.append(row)
    # M5 participation-confirmation summaries
    m5=[]
    for L in (1,5,20):
        for yr in [2016,2017,'pooled']:
            d=ev if yr=='pooled' else ev[ev.year==yr]
            for grp in ['CONFIRM','OPPOSE','NEUTRAL']:
                g=d[d[f'etf_relation_{L}']==grp] if f'etf_relation_{L}' in d else d.iloc[0:0]
                row=dict(L=L,period=yr,group=grp,n=len(g))
                for fw in EVENT_FORWARDS:
                    vals=g[f'macro_signed_{fw}m_pct']
                    row[f'mean_{fw}m_pct']=vals.mean(); row[f'hit_{fw}m']=float((vals>0).mean()) if len(vals.dropna()) else np.nan
                m5.append(row)
    return ev,pd.DataFrame(m4),pd.DataFrame(m5)


def classify(cont,fwd,joint,m4,m5):
    out={}
    # Daily meanings: year-stability across all 9 cells + primary 5/5 & 20/20.
    for claim in ['M1_REAL','M2_USD','M3_ETF']:
        c=cont[(cont.claim==claim)&(cont.L.isin([5,20]))]
        contemp_ok=all(c[c.period==yr].rho_contemp.gt(0).all() for yr in [2016,2017])
        details={}
        stable=True
        for yr in [2016,2017]:
            f=fwd[(fwd.claim==claim)&(fwd.period==yr)]
            pos=int((f.rho>0).sum()); primary=f[((f.L==5)&(f.H==5))|((f.L==20)&(f.H==20))]
            details[str(yr)]={'positive_cells_of_9':pos,'primary_rhos':primary[['L','H','rho']].to_dict('records')}
            if pos<6 or not primary.rho.gt(0).all(): stable=False
        if stable: label='FORWARD-SUPPORTED'
        elif contemp_ok: label='CONTEMPORANEOUS-ONLY / CONDITIONAL-UNSTABLE'
        else: label='CONTRADICTED'
        if claim=='M3_ETF':
            j17=joint[(joint.period==2017)&(((joint.L==5)&(joint.H==5))|((joint.L==20)&(joint.H==20)))]
            if len(j17) and (j17.ETF_beta<0).all(): label='CONDITIONAL-UNSTABLE (2017 forward sign reverses after controls)'
        out[claim]={'classification':label,'contemporaneous_primary_positive_both_years':bool(contemp_ok),'detail':details}
    # M4: requires >=3 rejection observations in each year to call supported/failed.
    rej=m4[(m4.scope=='BEARISH_ONLY')&(m4.group=='REJECT')]
    counts={str(int(r.period)):int(r.n) for r in rej.itertuples() if r.period in [2016,2017]}
    if all(counts.get(str(y),0)>=3 for y in [2016,2017]):
        ok=True
        for y in [2016,2017]:
            r=rej[rej.period==y].iloc[0]
            ok &= (r['mean_expected_60m_pct']>0 and r['mean_expected_240m_pct']>0)
        lab='FORWARD-SUPPORTED' if ok else 'CONTRADICTED / UNSTABLE'
    else: lab='INSUFFICIENT REJECTION SAMPLE'
    out['M4_REACTION_REJECTION']={'classification':lab,'bearish_rejection_counts':counts}
    # M5: confirm must beat oppose in both years at both forwards for either fixed 5d or 20d lookback; no best-cell selection.
    perL={}
    for L in [5,20]:
        good=True
        for y in [2016,2017]:
            c=m5[(m5.L==L)&(m5.period==y)&(m5.group=='CONFIRM')]
            o=m5[(m5.L==L)&(m5.period==y)&(m5.group=='OPPOSE')]
            if len(c)!=1 or len(o)!=1: good=False; continue
            c=c.iloc[0];o=o.iloc[0]
            good &= (c.mean_60m_pct>o.mean_60m_pct and c.mean_240m_pct>o.mean_240m_pct)
        perL[str(L)]=bool(good)
    out['M5_PARTICIPATION_CONFIRMATION']={'classification':'FORWARD-SUPPORTED' if all(perL.values()) else 'CONDITIONAL / UNSTABLE','lookback_consistency':perL}
    out['GEOPOLITICAL_DEMAND']='UNTESTED — VIX is not accepted as a faithful geopolitical-demand proxy'
    out['STRUCTURAL_CB_DEMAND']='UNTESTED — insufficient point-in-time frequency for V1'
    return out


def main():
    guard(); OUT.mkdir(parents=True,exist_ok=True)
    m=build_daily(); cont,fwd=daily_claims(m); joint=joint_claims(m); ev,m4,m5=event_claims(m)
    cls=classify(cont,fwd,joint,m4,m5)
    cont.to_csv(OUT/'daily_contemporaneous_translation.csv',index=False)
    fwd.to_csv(OUT/'daily_forward_consequence.csv',index=False)
    joint.to_csv(OUT/'daily_joint_incremental_regressions.csv',index=False)
    ev.to_csv(OUT/'event_meaning_ledger.csv',index=False)
    m4.to_csv(OUT/'m4_reaction_rejection.csv',index=False)
    m5.to_csv(OUT/'m5_participation_confirmation.csv',index=False)
    summary={'status':'POST_2017_DEVELOPMENT_CLAIM_FALSIFICATION','preserved_2018_accessed':False,'classifications':cls}
    (OUT/'summary.json').write_text(json.dumps(summary,indent=2,default=str)+'\n')
    print('GOLD_CAUSAL_MEANING_FALSIFICATION_V1_COMPLETE')
    print(json.dumps(summary,indent=2))
    print('\nPRIMARY CONTEMPORANEOUS')
    print(cont[(cont.L.isin([5,20]))].to_string(index=False))
    print('\nPRIMARY FORWARD')
    print(fwd[(fwd.L.isin([5,20]))&(fwd.H.isin([5,20]))].to_string(index=False))
    print('\nM4')
    print(m4.to_string(index=False))
    print('\nM5')
    print(m5.to_string(index=False))

if __name__=='__main__': main()
