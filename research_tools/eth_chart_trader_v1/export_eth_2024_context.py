from __future__ import annotations
import csv, hashlib, io, json, os, urllib.request, zipfile
from pathlib import Path
import pandas as pd

WORK=Path(os.environ['WORK']); OUT=WORK/'chart_export'; OUT.mkdir(parents=True,exist_ok=True)
BASE='https://data.binance.vision/data/futures/um/monthly/klines/ETHUSDT/1h'
COLS=['openTime','open','high','low','close','volume','closeTime','quoteVolume','trades','takerBuyBase','takerBuyQuote','ignore']

def get(url):
    r=urllib.request.Request(url,headers={'User-Agent':'eth-chart-trader-v1/1.0'})
    with urllib.request.urlopen(r,timeout=60) as x: return x.read()

def sha(b): return hashlib.sha256(b).hexdigest()

frames=[]; audit=[]
for m in range(1,13):
    name=f'ETHUSDT-1h-2024-{m:02d}.zip'; url=f'{BASE}/{name}'
    b=get(url); chk=get(url+'.CHECKSUM').decode().split()[0].lower()
    if sha(b)!=chk: raise SystemExit(f'CHECKSUM_FAIL {m}')
    with zipfile.ZipFile(io.BytesIO(b)) as z:
        n=[x for x in z.namelist() if x.endswith('.csv')][0]; raw=z.read(n)
    first=raw.splitlines()[0].decode(errors='replace').split(',')[0]
    has_header=not first.lstrip('+-').isdigit()
    df=pd.read_csv(io.BytesIO(raw),header=0 if has_header else None)
    df=df.iloc[:,:12]; df.columns=COLS[:df.shape[1]]
    frames.append(df[['openTime','open','high','low','close','volume']].copy())
    audit.append({'month':m,'archive_sha256':chk,'rows':len(df)})

x=pd.concat(frames,ignore_index=True)
for c in ['openTime','open','high','low','close','volume']: x[c]=pd.to_numeric(x[c],errors='raise')
# Binance archive may use microseconds in newer files; normalize to ms.
if x.openTime.median()>1e14: x['openTime']=(x.openTime//1000).astype('int64')
x['timestamp']=pd.to_datetime(x.openTime,unit='ms',utc=True)
x=x[(x.timestamp>='2024-01-01')&(x.timestamp<'2025-01-01')].drop_duplicates('timestamp').sort_values('timestamp')
if len(x)!=8784: raise SystemExit(f'ROW_COUNT_FAIL {len(x)}')
out1=x[['timestamp','open','high','low','close','volume']].copy(); out1.to_csv(OUT/'ETHUSDT_1h_2024.csv',index=False,float_format='%.10g')
y=out1.set_index('timestamp').resample('4h',label='left',closed='left').agg(open=('open','first'),high=('high','max'),low=('low','min'),close=('close','last'),volume=('volume','sum')).dropna().reset_index()
if len(y)!=2196: raise SystemExit(f'4H_ROW_COUNT_FAIL {len(y)}')
y.to_csv(OUT/'ETHUSDT_4h_2024.csv',index=False,float_format='%.10g')
(OUT/'manifest.json').write_text(json.dumps({'status':'PASS','rows_1h':len(out1),'rows_4h':len(y),'first':str(out1.timestamp.iloc[0]),'last':str(out1.timestamp.iloc[-1]),'archives':audit},indent=2)+'\n')
print('ETH_2024_CHART_EXPORT_PASS',len(out1),len(y))
