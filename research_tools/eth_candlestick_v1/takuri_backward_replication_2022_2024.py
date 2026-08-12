from __future__ import annotations

import hashlib
import io
import json
import os
import urllib.request
import zipfile
from pathlib import Path

import numpy as np
import pandas as pd
import talib
from scipy import stats

ROOT = Path(__file__).resolve().parent
WORK = Path(os.environ.get("WORK", ROOT))
DL = WORK / "takuri_binance_archives"
DL.mkdir(parents=True, exist_ok=True)

BASE = "https://data.binance.vision/data/futures/um/monthly/klines"
SYMBOL = "ETHUSDT"
INTERVAL = "5m"
TARGET_YEARS = [2022, 2023, 2024]
COSTS_BPS = [0.0, 5.0, 9.0]

# Frozen from the 2025 discovery. Do not tune these on 2022-2024.
PRIOR_TREND_BARS = 12
HORIZON_BARS = 24
ENTRY_SHIFT = 2  # pattern bar -> confirmation bar -> following open

COLS12 = [
    "openTime", "open", "high", "low", "close", "volume", "closeTime",
    "quoteVolume", "trades", "takerBuyBase", "takerBuyQuote", "ignore",
]


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "takuri-backward-replication-v1/1.0"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()


def archive_url(year: int, month: int) -> str:
    stem = f"{SYMBOL}-{INTERVAL}-{year}-{month:02d}.zip"
    return f"{BASE}/{SYMBOL}/{INTERVAL}/{stem}"


def download_verified(year: int, month: int) -> tuple[Path, dict]:
    url = archive_url(year, month)
    path = DL / f"{year}" / url.rsplit("/", 1)[-1]
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_bytes(fetch(url))
    actual = sha256_file(path)
    checksum_text = fetch(url + ".CHECKSUM").decode("utf-8", "replace").strip()
    expected = checksum_text.split()[0].lower()
    if actual.lower() != expected:
        raise RuntimeError(f"CHECKSUM_FAIL {year}-{month:02d} expected={expected} actual={actual}")
    return path, {"url": url, "sha256": actual, "bytes": path.stat().st_size}


def parse_archive(path: Path) -> pd.DataFrame:
    with zipfile.ZipFile(path) as z:
        names = [n for n in z.namelist() if n.lower().endswith(".csv")]
        if len(names) != 1:
            raise RuntimeError(f"ZIP_CSV_COUNT_FAIL {path}")
        raw = z.read(names[0])
    first = raw.splitlines()[0].decode("utf-8", "replace").split(",")[0].strip()
    has_header = not first.lstrip("-+").isdigit()
    frame = pd.read_csv(io.BytesIO(raw), header=0 if has_header else None)
    frame = frame.iloc[:, : min(12, frame.shape[1])].copy()
    frame.columns = COLS12[: frame.shape[1]]
    frame = frame[["openTime", "open", "high", "low", "close", "volume"]].copy()
    frame["openTime"] = pd.to_numeric(frame["openTime"], errors="raise").astype("int64")
    if frame["openTime"].abs().median() > 10**14:
        frame["openTime"] //= 1000
    for c in ["open", "high", "low", "close", "volume"]:
        frame[c] = pd.to_numeric(frame[c], errors="raise").astype(float)
    return frame


def build_hourly() -> tuple[pd.DataFrame, list[dict]]:
    # December 2021 is included only as causal warm-up for early-2022 lookback.
    months = [(2021, 12)]
    for year in TARGET_YEARS:
        months.extend((year, m) for m in range(1, 13))

    parts = []
    audit = []
    for year, month in months:
        path, meta = download_verified(year, month)
        parts.append(parse_archive(path))
        audit.append({"year": year, "month": month, **meta})

    x = pd.concat(parts, ignore_index=True)
    x = x.drop_duplicates("openTime").sort_values("openTime").reset_index(drop=True)
    diffs = np.diff(x["openTime"].to_numpy(np.int64))
    if not np.all(diffs == 300000):
        raise RuntimeError(f"5M_CADENCE_FAIL bad={int(np.sum(diffs != 300000))}")

    x["timestamp"] = pd.to_datetime(x.pop("openTime"), unit="ms", utc=True)
    hourly = x.set_index("timestamp").resample("1h", label="left", closed="left").agg(
        open=("open", "first"),
        high=("high", "max"),
        low=("low", "min"),
        close=("close", "last"),
        volume=("volume", "sum"),
    ).dropna().reset_index()
    return hourly, audit


def one_sided_p(x: np.ndarray) -> float:
    if len(x) < 2 or np.std(x, ddof=1) == 0:
        return float("nan")
    return float(stats.ttest_1samp(x, 0.0, alternative="greater").pvalue)


def nonoverlap(indices: np.ndarray) -> np.ndarray:
    kept = []
    last_exit = -1
    for i in indices:
        entry = i + ENTRY_SHIFT
        exit_i = entry + HORIZON_BARS - 1
        if entry > last_exit:
            kept.append(i)
            last_exit = exit_i
    return np.asarray(kept, dtype=int)


def detect_and_evaluate(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    o = df["open"].to_numpy(float)
    h = df["high"].to_numpy(float)
    l = df["low"].to_numpy(float)
    c = df["close"].to_numpy(float)
    takuri = talib.CDLTAKURI(o, h, l, c) > 0

    close_s = df["close"]
    # Exact 2025 context definition: on pattern candle i, compare close[i-1]
    # with close[i-13], i.e. prior 12h decline excluding the pattern candle.
    prior_ret = close_s.shift(1) / close_s.shift(1 + PRIOR_TREND_BARS) - 1.0
    prior_decline = prior_ret < 0

    pattern_idx = np.flatnonzero(takuri & prior_decline.fillna(False).to_numpy(bool))
    confirm_idx = pattern_idx + 1
    valid = confirm_idx < len(df)
    pattern_idx = pattern_idx[valid]
    confirm_idx = confirm_idx[valid]
    bullish_confirm = c[confirm_idx] > o[confirm_idx]
    pattern_idx = pattern_idx[bullish_confirm]

    max_signal = len(df) - ENTRY_SHIFT - HORIZON_BARS
    pattern_idx = pattern_idx[pattern_idx <= max_signal]
    pattern_idx = nonoverlap(pattern_idx)

    rows = []
    for i in pattern_idx:
        entry_i = i + ENTRY_SHIFT
        exit_i = entry_i + HORIZON_BARS - 1
        pattern_ts = df.loc[i, "timestamp"]
        entry_ts = df.loc[entry_i, "timestamp"]
        exit_ts = df.loc[exit_i, "timestamp"] + pd.Timedelta(hours=1)
        year = int(entry_ts.year)
        if year not in TARGET_YEARS:
            continue
        gross_bps = (c[exit_i] / o[entry_i] - 1.0) * 10000.0
        rows.append({
            "year": year,
            "pattern_timestamp": pattern_ts.isoformat(),
            "entry_timestamp": entry_ts.isoformat(),
            "exit_timestamp": exit_ts.isoformat(),
            "entry_price": float(o[entry_i]),
            "exit_price": float(c[exit_i]),
            "gross_bps": float(gross_bps),
            "net_5bps": float(gross_bps - 5.0),
            "net_9bps": float(gross_bps - 9.0),
            "winner_gross": bool(gross_bps > 0),
            "winner_net5": bool(gross_bps > 5.0),
            "prior_12h_return_pct": float(prior_ret.iloc[i] * 100.0),
        })

    trades = pd.DataFrame(rows)
    if trades.empty:
        raise RuntimeError("NO_TRADES")

    summaries = []
    for label, g in [(str(y), trades[trades.year == y]) for y in TARGET_YEARS] + [("POOLED_2022_2024", trades)]:
        x = g["gross_bps"].to_numpy(float)
        if len(g) == 0:
            summaries.append({"period": label, "n": 0})
            continue
        quarters = pd.PeriodIndex(pd.to_datetime(g["entry_timestamp"], utc=True), freq="Q")
        months = pd.PeriodIndex(pd.to_datetime(g["entry_timestamp"], utc=True), freq="M")
        q_net = g.assign(q=quarters).groupby("q")["net_5bps"].mean()
        m_net = g.assign(m=months).groupby("m")["net_5bps"].mean()
        summaries.append({
            "period": label,
            "n": int(len(g)),
            "winners_gross": int((g.gross_bps > 0).sum()),
            "losers_gross": int((g.gross_bps <= 0).sum()),
            "win_rate_gross": float((g.gross_bps > 0).mean()),
            "winners_net5": int((g.net_5bps > 0).sum()),
            "mean_gross_bps": float(g.gross_bps.mean()),
            "median_gross_bps": float(g.gross_bps.median()),
            "mean_net_5bps": float(g.net_5bps.mean()),
            "mean_net_9bps": float(g.net_9bps.mean()),
            "sum_gross_bps": float(g.gross_bps.sum()),
            "best_trade_bps": float(g.gross_bps.max()),
            "worst_trade_bps": float(g.gross_bps.min()),
            "p_value_one_sided_fixed_rule": one_sided_p(x),
            "positive_quarters_net5": int((q_net > 0).sum()),
            "quarters_present": int(len(q_net)),
            "positive_months_net5": int((m_net > 0).sum()),
            "months_present": int(len(m_net)),
        })
    return trades, pd.DataFrame(summaries)


def main() -> None:
    hourly, archive_audit = build_hourly()
    expected_hours = {2022: 8760, 2023: 8760, 2024: 8784}
    year_rows = {y: int((hourly.timestamp.dt.year == y).sum()) for y in TARGET_YEARS}
    if year_rows != expected_hours:
        raise RuntimeError(f"HOURLY_ROW_COUNT_FAIL got={year_rows} expected={expected_hours}")

    trades, summary = detect_and_evaluate(hourly)
    out = WORK / "takuri_backward_outputs"
    out.mkdir(parents=True, exist_ok=True)
    trades.to_csv(out / "trades.csv", index=False)
    summary.to_csv(out / "summary.csv", index=False)
    (out / "archive_audit.json").write_text(json.dumps({
        "status": "PASS",
        "source": "Binance Data Vision USD-M futures monthly 5m klines",
        "checksum_verified_archives": len(archive_audit),
        "hourly_rows": year_rows,
        "archives": archive_audit,
    }, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Frozen Takuri backward replication: 2022-2024",
        "",
        "Rule frozen from 2025 discovery: 1h bullish TA-Lib Takuri; prior 12h decline excluding pattern candle; next 1h candle bullish confirmation; enter following 1h open; hold exactly 24 hourly bars; non-overlapping trades; no parameter tuning.",
        "",
        summary.to_markdown(index=False),
        "",
        "Funding is not included in this first replication. Trading-cost sensitivity is shown at 5 and 9 bps round trip.",
    ]
    (out / "RESULTS.md").write_text("\n".join(lines), encoding="utf-8")

    print("TAKURI_BACKWARD_REPLICATION_PASS")
    print(summary.to_json(orient="records"))


if __name__ == "__main__":
    main()
