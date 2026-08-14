#!/usr/bin/env python3
"""Acquire/inspect official public inputs needed for a fuller gold macro layer.

No strategy test and no 2018 gold outcome access. The probe checks whether the
following can be reconstructed reproducibly for consumed 2016-2017:
- DGS2: 2Y nominal Treasury yield (Fed/FRED)
- DFII5, DFII10: real yields (Fed/FRED)
- DTWEXBGS: broad trade-weighted USD index (Fed/FRED)
- VIXCLS: VIX (CBOE via FRED)
- SPDR GLD official historical archive: daily holdings/shares/NAV fields

The GLD archive may contain later years, but this probe writes a strictly
2016-2017 extracted table before any strategy analysis. 2018 XAU/Oanda data are
not requested or read.
"""
from __future__ import annotations
import io, json, hashlib
from pathlib import Path
import pandas as pd
import requests

OUT=Path.home()/'.cache/gold_research/full_upper_layer_probe'
OUT.mkdir(parents=True,exist_ok=True)

FRED={
    'DGS2':'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS2',
    'DFII5':'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DFII5',
    'DFII10':'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DFII10',
    'DTWEXBGS':'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DTWEXBGS',
    'VIXCLS':'https://fred.stlouisfed.org/graph/fredgraph.csv?id=VIXCLS',
}
GLD='https://api.spdrgoldshares.com/api/v1/historical-archive?exchange=NYSE&lang=en&product=gld'


def sha(b:bytes): return hashlib.sha256(b).hexdigest()

def get(url):
    r=requests.get(url,headers={'User-Agent':'Mozilla/5.0 gold-macro-research'},timeout=90)
    r.raise_for_status(); return r


def parse_fred(name,url):
    r=get(url); (OUT/f'{name}_raw.csv').write_bytes(r.content)
    d=pd.read_csv(io.BytesIO(r.content))
    d.columns=['date',name]
    d['date']=pd.to_datetime(d.date,errors='coerce')
    d[name]=pd.to_numeric(d[name],errors='coerce')
    d=d[(d.date>='2016-01-01')&(d.date<='2017-12-31')].dropna(subset=['date'])
    d.to_csv(OUT/f'{name}_2016_2017.csv',index=False)
    return {'source':url,'status':r.status_code,'content_type':r.headers.get('content-type'),'raw_bytes':len(r.content),'raw_sha256':sha(r.content),'rows_2016_2017':len(d),'non_null_2016_2017':int(d[name].notna().sum()),'first':str(d.date.min()),'last':str(d.date.max())}


def inspect_gld():
    r=get(GLD); raw=r.content; (OUT/'gld_official_historical_archive.xlsx').write_bytes(raw)
    xl=pd.ExcelFile(io.BytesIO(raw),engine='openpyxl')
    result={'source':GLD,'status':r.status_code,'content_type':r.headers.get('content-type'),'raw_bytes':len(raw),'raw_sha256':sha(raw),'sheet_names':xl.sheet_names}
    previews={}
    chosen=None
    for s in xl.sheet_names:
        # Read without assuming header to expose file structure.
        p=pd.read_excel(io.BytesIO(raw),sheet_name=s,header=None,nrows=20,engine='openpyxl')
        previews[s]=p.astype(str).fillna('').values.tolist()
        # Then try likely header rows 0..10 and select one with date-like + holdings-like labels.
        for h in range(0,11):
            try:
                d=pd.read_excel(io.BytesIO(raw),sheet_name=s,header=h,engine='openpyxl')
            except Exception:
                continue
            cols=[str(c).strip() for c in d.columns]
            text=' | '.join(cols).lower()
            if ('date' in text) and any(k in text for k in ('tonnes','ounces','gold holdings','total gold','shares outstanding')):
                chosen=(s,h,d,cols); break
        if chosen: break
    (OUT/'gld_sheet_previews.json').write_text(json.dumps(previews,indent=2,default=str)+'\n')
    if not chosen:
        result['parsed']='NO_HEADER_MATCH'
        return result
    s,h,d,cols=chosen
    result.update({'parsed':'HEADER_MATCH','chosen_sheet':s,'header_row':h,'columns':cols})
    # Identify first date-like column and strictly extract 2016-2017 rows.
    datecol=None
    for c in d.columns:
        if 'date' in str(c).lower(): datecol=c; break
    dates=pd.to_datetime(d[datecol],errors='coerce')
    x=d.loc[(dates>='2016-01-01')&(dates<='2017-12-31')].copy(); x.insert(0,'parsed_date',dates[(dates>='2016-01-01')&(dates<='2017-12-31')].values)
    x.to_csv(OUT/'gld_official_2016_2017.csv',index=False)
    result['rows_2016_2017']=len(x)
    return result


def main():
    audit={'status':'DATA_PROBE_ONLY','preserved_2018_xau_accessed':False,'fred':{},'gld':None}
    for n,u in FRED.items(): audit['fred'][n]=parse_fred(n,u)
    audit['gld']=inspect_gld()
    (OUT/'audit.json').write_text(json.dumps(audit,indent=2,default=str)+'\n')
    print('GOLD_FULL_UPPER_LAYER_DATA_PROBE_COMPLETE')
    print(json.dumps(audit,indent=2,default=str))

if __name__=='__main__': main()
