from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd
import talib
from scipy import stats

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "candlestick_research_outputs"
OUT.mkdir(parents=True, exist_ok=True)
RNG_SEED = 20260811
COST_PRIMARY_BPS = 5.0
COST_STRESS_BPS = 9.0
MIN_N = 30

DATASETS = {
    "5m": {
        "eth": ROOT / "ETHUSDT_5m_2025.csv.gz",
        "btc": ROOT / "BTCUSDT_5m_2025.csv.gz",
        "compression": "gzip",
        "bar_minutes": 5,
        "horizons": [3, 6, 12, 24],
        "trend_bars": 12,
        "range_bars": 48,
        "activity_bars": 48,
        "relative_bars": 12,
    },
    "1h": {
        "eth": ROOT / "ETHUSDT_1h_2025.csv",
        "btc": ROOT / "BTCUSDT_1h_2025.csv",
        "compression": None,
        "bar_minutes": 60,
        "horizons": [1, 3, 6, 12, 24],
        "trend_bars": 12,
        "range_bars": 48,
        "activity_bars": 48,
        "relative_bars": 12,
    },
}

# 30 bullish + 25 bearish reversal patterns used by Moser & Brauneis (2026),
# mapped to TA-Lib's fixed recognition functions. Direction is frozen a priori.
PATTERNS = [
    # bullish
    ("Abandoned Baby Bullish", "CDLABANDONEDBABY", 1),
    ("Breakaway Bullish", "CDLBREAKAWAY", 1),
    ("Concealing Baby Swallow", "CDLCONCEALBABYSWALL", 1),
    ("Counterattack Bullish", "CDLCOUNTERATTACK", 1),
    ("Doji Star Bullish", "CDLDOJISTAR", 1),
    ("Dragonfly Doji", "CDLDRAGONFLYDOJI", 1),
    ("Engulfing Pattern Bullish", "CDLENGULFING", 1),
    ("Hammer", "CDLHAMMER", 1),
    ("Harami Pattern Bullish", "CDLHARAMI", 1),
    ("Harami Cross Pattern Bullish", "CDLHARAMICROSS", 1),
    ("Hikkake Pattern Bullish", "CDLHIKKAKE", 1),
    ("Homing Pigeon", "CDLHOMINGPIGEON", 1),
    ("Inverted Hammer", "CDLINVERTEDHAMMER", 1),
    ("Kicking Bullish", "CDLKICKING", 1),
    ("Kicking by Length Bullish", "CDLKICKINGBYLENGTH", 1),
    ("Ladder Bottom", "CDLLADDERBOTTOM", 1),
    ("Matching Low", "CDLMATCHINGLOW", 1),
    ("Modified Hikkake Pattern Bullish", "CDLHIKKAKEMOD", 1),
    ("Morning Doji Star", "CDLMORNINGDOJISTAR", 1),
    ("Morning Star", "CDLMORNINGSTAR", 1),
    ("Piercing Pattern", "CDLPIERCING", 1),
    ("Stick Sandwich Bullish", "CDLSTICKSANDWICH", 1),
    ("Takuri", "CDLTAKURI", 1),
    ("Tasuki Gap Bullish", "CDLTASUKIGAP", 1),
    ("Three Inside Up", "CDL3INSIDE", 1),
    ("Three Outside Up", "CDL3OUTSIDE", 1),
    ("Three Stars In The South", "CDL3STARSINSOUTH", 1),
    ("Three Advancing White Soldiers", "CDL3WHITESOLDIERS", 1),
    ("Tristar Pattern Bullish", "CDLTRISTAR", 1),
    ("Unique 3 River", "CDLUNIQUE3RIVER", 1),
    # bearish
    ("Abandoned Baby Bearish", "CDLABANDONEDBABY", -1),
    ("Advance Block", "CDLADVANCEBLOCK", -1),
    ("Breakaway Bearish", "CDLBREAKAWAY", -1),
    ("Counterattack Bearish", "CDLCOUNTERATTACK", -1),
    ("Dark Cloud Cover", "CDLDARKCLOUDCOVER", -1),
    ("Doji Star Bearish", "CDLDOJISTAR", -1),
    ("Engulfing Pattern Bearish", "CDLENGULFING", -1),
    ("Evening Doji Star", "CDLEVENINGDOJISTAR", -1),
    ("Evening Star", "CDLEVENINGSTAR", -1),
    ("Hanging Man", "CDLHANGINGMAN", -1),
    ("Harami Pattern Bearish", "CDLHARAMI", -1),
    ("Hikkake Pattern Bearish", "CDLHIKKAKE", -1),
    ("Modified Hikkake Pattern Bearish", "CDLHIKKAKEMOD", -1),
    ("Identical Three Crows", "CDLIDENTICAL3CROWS", -1),
    ("Kicking Bearish", "CDLKICKING", -1),
    ("Kicking by Length Bearish", "CDLKICKINGBYLENGTH", -1),
    ("Harami Cross Pattern Bearish", "CDLHARAMICROSS", -1),
    ("Shooting Star", "CDLSHOOTINGSTAR", -1),
    ("Stalled Pattern Bearish", "CDLSTALLEDPATTERN", -1),
    ("Tasuki Gap Bearish", "CDLTASUKIGAP", -1),
    ("Two Crows", "CDL2CROWS", -1),
    ("Three Black Crows", "CDL3BLACKCROWS", -1),
    ("Three Inside Down", "CDL3INSIDE", -1),
    ("Three Outside Down", "CDL3OUTSIDE", -1),
    ("Tristar Pattern Bearish", "CDLTRISTAR", -1),
]

CONTEXTS = [
    "raw",
    "trend",
    "location",
    "volume_volatility",
    "relative",
    "trend_location",
    "trend_location_volume_volatility",
    "full_context",
]
ENTRY_MODES = ["immediate", "next_candle_confirmation"]


def read_ohlcv(path: Path, compression=None) -> pd.DataFrame:
    df = pd.read_csv(path, compression=compression)
    if "timestamp" not in df.columns:
        if "openTime" in df.columns:
            df["timestamp"] = pd.to_datetime(df.pop("openTime"), unit="ms", utc=True)
        elif "open_time" in df.columns:
            raw = pd.to_numeric(df.pop("open_time"), errors="coerce")
            unit = "ms" if raw.dropna().median() > 1e11 else "s"
            df["timestamp"] = pd.to_datetime(raw, unit=unit, utc=True)
        else:
            raise RuntimeError(f"No timestamp column in {path}")
    else:
        df["timestamp"] = pd.to_datetime(df["timestamp"], utc=True)
    for c in ["open", "high", "low", "close", "volume"]:
        df[c] = pd.to_numeric(df[c], errors="coerce")
    df = df.dropna(subset=["timestamp", "open", "high", "low", "close", "volume"])
    return df.drop_duplicates("timestamp").sort_values("timestamp").reset_index(drop=True)


def align_eth_btc(spec):
    eth = read_ohlcv(spec["eth"], spec["compression"])
    btc = read_ohlcv(spec["btc"], spec["compression"])
    btc = btc[["timestamp", "open", "high", "low", "close", "volume"]].rename(
        columns={c: f"btc_{c}" for c in ["open", "high", "low", "close", "volume"]}
    )
    x = eth.merge(btc, on="timestamp", how="inner", validate="one_to_one")
    if len(x) != len(eth):
        raise RuntimeError(f"ETH/BTC alignment lost rows eth={len(eth)} joined={len(x)}")
    return x


def rolling_true_range(df: pd.DataFrame) -> pd.Series:
    prev = df["close"].shift(1)
    return pd.concat([
        df["high"] - df["low"],
        (df["high"] - prev).abs(),
        (df["low"] - prev).abs(),
    ], axis=1).max(axis=1)


def build_context(df: pd.DataFrame, spec: dict) -> dict[str, pd.Series]:
    close = df["close"]
    t = spec["trend_bars"]
    r = spec["range_bars"]
    a = spec["activity_bars"]
    rel = spec["relative_bars"]

    prior_ret = close.shift(1) / close.shift(1 + t) - 1.0
    prev_hi = df["high"].shift(1).rolling(r).max()
    prev_lo = df["low"].shift(1).rolling(r).min()
    span = (prev_hi - prev_lo).replace(0, np.nan)
    range_pos = (close - prev_lo) / span

    tr = rolling_true_range(df)
    volume_med = df["volume"].shift(1).rolling(a).median()
    tr_med = tr.shift(1).rolling(a).median()
    active = (df["volume"] >= volume_med) & (tr >= tr_med)

    eth_rel = (df["close"] / df["btc_close"])
    prior_relative_ret = eth_rel.shift(1) / eth_rel.shift(1 + rel) - 1.0

    return {
        "prior_ret": prior_ret,
        "range_pos": range_pos,
        "activity": active,
        "prior_relative_ret": prior_relative_ret,
    }


def detect_pattern(df: pd.DataFrame, talib_name: str, direction: int) -> np.ndarray:
    fn = getattr(talib, talib_name)
    raw = fn(
        df["open"].to_numpy(float),
        df["high"].to_numpy(float),
        df["low"].to_numpy(float),
        df["close"].to_numpy(float),
    )
    return raw > 0 if direction > 0 else raw < 0


def context_mask(ctx: dict[str, pd.Series], direction: int, name: str) -> np.ndarray:
    trend_ok = ctx["prior_ret"] < 0 if direction > 0 else ctx["prior_ret"] > 0
    location_ok = ctx["range_pos"] <= 0.35 if direction > 0 else ctx["range_pos"] >= 0.65
    relative_ok = ctx["prior_relative_ret"] < 0 if direction > 0 else ctx["prior_relative_ret"] > 0
    activity_ok = ctx["activity"].fillna(False)

    if name == "raw":
        mask = pd.Series(True, index=ctx["prior_ret"].index)
    elif name == "trend":
        mask = trend_ok
    elif name == "location":
        mask = location_ok
    elif name == "volume_volatility":
        mask = activity_ok
    elif name == "relative":
        mask = relative_ok
    elif name == "trend_location":
        mask = trend_ok & location_ok
    elif name == "trend_location_volume_volatility":
        mask = trend_ok & location_ok & activity_ok
    elif name == "full_context":
        mask = trend_ok & location_ok & activity_ok & relative_ok
    else:
        raise ValueError(name)
    return mask.fillna(False).to_numpy(bool)


def nonoverlap(indices: np.ndarray, entry_shift: int, horizon: int) -> np.ndarray:
    kept = []
    last_exit = -1
    for i in indices:
        entry = i + entry_shift
        exit_i = entry + horizon - 1
        if entry > last_exit:
            kept.append(i)
            last_exit = exit_i
    return np.asarray(kept, dtype=int)


def bh_adjust(pvalues: np.ndarray) -> np.ndarray:
    p = np.asarray(pvalues, float)
    out = np.full(len(p), np.nan)
    valid = np.flatnonzero(np.isfinite(p))
    if len(valid) == 0:
        return out
    order = valid[np.argsort(p[valid])]
    m = len(order)
    adjusted = np.empty(m)
    running = 1.0
    for j in range(m - 1, -1, -1):
        rank = j + 1
        running = min(running, p[order[j]] * m / rank)
        adjusted[j] = running
    out[order] = np.minimum(1.0, adjusted)
    return out


def holm_adjust(pvalues: np.ndarray) -> np.ndarray:
    p = np.asarray(pvalues, float)
    out = np.full(len(p), np.nan)
    valid = np.flatnonzero(np.isfinite(p))
    if len(valid) == 0:
        return out
    order = valid[np.argsort(p[valid])]
    m = len(order)
    running = 0.0
    for j, idx in enumerate(order):
        running = max(running, (m - j) * p[idx])
        out[idx] = min(1.0, running)
    return out


def one_sided_p(x: np.ndarray) -> float:
    if len(x) < 2 or not np.isfinite(np.std(x, ddof=1)) or np.std(x, ddof=1) == 0:
        return np.nan
    return float(stats.ttest_1samp(x, 0.0, alternative="greater").pvalue)


def evaluate(df, signal_mask, direction, horizon, context, entry_mode):
    idx = np.flatnonzero(signal_mask)
    if entry_mode == "immediate":
        entry_shift = 1
    else:
        confirm_idx = idx + 1
        valid = confirm_idx < len(df)
        idx = idx[valid]
        confirm_idx = confirm_idx[valid]
        candle_up = df["close"].to_numpy()[confirm_idx] > df["open"].to_numpy()[confirm_idx]
        confirm_ok = candle_up if direction > 0 else ~candle_up
        idx = idx[confirm_ok]
        entry_shift = 2

    max_signal = len(df) - entry_shift - horizon
    idx = idx[idx <= max_signal]
    idx = nonoverlap(idx, entry_shift, horizon)
    if len(idx) == 0:
        return None, None, None

    entry_idx = idx + entry_shift
    exit_idx = entry_idx + horizon - 1
    eth_entry = df["open"].to_numpy()[entry_idx]
    eth_exit = df["close"].to_numpy()[exit_idx]
    btc_entry = df["btc_open"].to_numpy()[entry_idx]
    btc_exit = df["btc_close"].to_numpy()[exit_idx]

    eth_ret_bps = (eth_exit / eth_entry - 1.0) * 10000.0
    btc_ret_bps = (btc_exit / btc_entry - 1.0) * 10000.0
    signed = direction * eth_ret_bps
    signed_excess_btc = direction * (eth_ret_bps - btc_ret_bps)
    net5 = signed - COST_PRIMARY_BPS
    net9 = signed - COST_STRESS_BPS

    ts = df["timestamp"].to_numpy()[idx]
    months = pd.PeriodIndex(pd.to_datetime(ts), freq="M").astype(str)
    quarters = pd.PeriodIndex(pd.to_datetime(ts), freq="Q").astype(str)

    monthly_rows = []
    for period in sorted(set(months)):
        m = months == period
        monthly_rows.append({
            "period": period,
            "n": int(m.sum()),
            "mean_gross_bps": float(np.mean(signed[m])),
            "mean_net_5bps": float(np.mean(net5[m])),
            "positive_rate": float(np.mean(signed[m] > 0)),
        })
    quarter_rows = []
    for period in sorted(set(quarters)):
        m = quarters == period
        quarter_rows.append({
            "period": period,
            "n": int(m.sum()),
            "mean_gross_bps": float(np.mean(signed[m])),
            "mean_net_5bps": float(np.mean(net5[m])),
            "positive_rate": float(np.mean(signed[m] > 0)),
        })

    result = {
        "n": int(len(signed)),
        "mean_gross_bps": float(np.mean(signed)),
        "median_gross_bps": float(np.median(signed)),
        "mean_net_5bps": float(np.mean(net5)),
        "mean_net_9bps": float(np.mean(net9)),
        "mean_excess_vs_btc_bps": float(np.mean(signed_excess_btc)),
        "positive_rate": float(np.mean(signed > 0)),
        "p_value_one_sided": one_sided_p(signed),
        "positive_quarters_gross": int(sum(r["mean_gross_bps"] > 0 for r in quarter_rows)),
        "positive_quarters_net5": int(sum(r["mean_net_5bps"] > 0 for r in quarter_rows)),
        "positive_months_gross": int(sum(r["mean_gross_bps"] > 0 for r in monthly_rows)),
        "positive_months_net5": int(sum(r["mean_net_5bps"] > 0 for r in monthly_rows)),
        "months_present": int(len(monthly_rows)),
        "quarters_present": int(len(quarter_rows)),
    }
    return result, monthly_rows, quarter_rows


def main():
    surface_rows = []
    event_rows = []
    month_rows = []
    quarter_rows = []

    for tf, spec in DATASETS.items():
        df = align_eth_btc(spec)
        ctx = build_context(df, spec)
        for pattern_name, talib_name, direction in PATTERNS:
            detected = detect_pattern(df, talib_name, direction)
            event_rows.append({
                "timeframe": tf,
                "pattern": pattern_name,
                "talib_function": talib_name,
                "direction": "BULLISH" if direction > 0 else "BEARISH",
                "raw_events": int(np.sum(detected)),
            })
            for context_name in CONTEXTS:
                cmask = context_mask(ctx, direction, context_name)
                signal = detected & cmask
                for entry_mode in ENTRY_MODES:
                    for horizon in spec["horizons"]:
                        result, monthly, quarterly = evaluate(
                            df, signal, direction, horizon, context_name, entry_mode
                        )
                        if result is None:
                            continue
                        key = {
                            "timeframe": tf,
                            "pattern": pattern_name,
                            "talib_function": talib_name,
                            "direction": "BULLISH" if direction > 0 else "BEARISH",
                            "horizon_bars": int(horizon),
                            "horizon_minutes": int(horizon * spec["bar_minutes"]),
                            "context": context_name,
                            "entry_mode": entry_mode,
                        }
                        surface_rows.append({**key, **result})
                        for row in monthly:
                            month_rows.append({**key, **row})
                        for row in quarterly:
                            quarter_rows.append({**key, **row})

    surface = pd.DataFrame(surface_rows)
    if surface.empty:
        raise RuntimeError("No candlestick surface rows generated")

    # Multiple-testing controls: global across the entire study and BH within each
    # pre-specified timeframe/horizon/context/entry family across candlestick rules.
    p = surface["p_value_one_sided"].to_numpy(float)
    surface["q_bh_global"] = bh_adjust(p)
    surface["p_holm_global"] = holm_adjust(p)
    surface["q_bh_pattern_family"] = np.nan
    fam_cols = ["timeframe", "horizon_minutes", "context", "entry_mode"]
    for _, ix in surface.groupby(fam_cols).groups.items():
        ix = np.asarray(list(ix), dtype=int)
        surface.loc[ix, "q_bh_pattern_family"] = bh_adjust(surface.loc[ix, "p_value_one_sided"].to_numpy(float))

    surface["stable_gross_3of4"] = surface["positive_quarters_gross"] >= 3
    surface["stable_net5_3of4"] = surface["positive_quarters_net5"] >= 3
    surface["exploratory_candidate"] = (
        (surface["n"] >= MIN_N)
        & (surface["q_bh_global"] <= 0.10)
        & surface["stable_gross_3of4"]
        & (surface["mean_gross_bps"] > 0)
    )
    surface["cost_survivor_5bps"] = (
        surface["exploratory_candidate"]
        & (surface["mean_net_5bps"] > 0)
        & surface["stable_net5_3of4"]
    )
    surface["cost_survivor_9bps"] = (
        surface["exploratory_candidate"]
        & (surface["mean_net_9bps"] > 0)
        & surface["stable_net5_3of4"]
    )
    surface["fwer_strict"] = (
        (surface["n"] >= MIN_N)
        & (surface["p_holm_global"] <= 0.05)
        & (surface["mean_net_5bps"] > 0)
        & surface["stable_net5_3of4"]
    )

    surface = surface.sort_values(
        ["fwer_strict", "cost_survivor_5bps", "q_bh_global", "mean_net_5bps"],
        ascending=[False, False, True, False],
    ).reset_index(drop=True)

    # Context lift relative to the exact matching raw row.
    raw = surface[surface["context"] == "raw"][
        ["timeframe", "pattern", "direction", "horizon_minutes", "entry_mode", "mean_gross_bps", "mean_net_5bps", "n"]
    ].rename(columns={"mean_gross_bps": "raw_mean_gross_bps", "mean_net_5bps": "raw_mean_net_5bps", "n": "raw_n"})
    lift = surface.merge(
        raw,
        on=["timeframe", "pattern", "direction", "horizon_minutes", "entry_mode"],
        how="left",
        validate="many_to_one",
    )
    lift["context_lift_gross_bps"] = lift["mean_gross_bps"] - lift["raw_mean_gross_bps"]
    lift["context_lift_net5_bps"] = lift["mean_net_5bps"] - lift["raw_mean_net_5bps"]

    surface.to_csv(OUT / "candlestick_pattern_surface.csv", index=False)
    pd.DataFrame(event_rows).to_csv(OUT / "pattern_event_counts.csv", index=False)
    pd.DataFrame(month_rows).to_csv(OUT / "monthly_stability.csv", index=False)
    pd.DataFrame(quarter_rows).to_csv(OUT / "quarterly_stability.csv", index=False)
    lift.to_csv(OUT / "context_lift.csv", index=False)
    surface[surface["exploratory_candidate"]].to_csv(OUT / "exploratory_candidates.csv", index=False)
    surface[surface["cost_survivor_5bps"]].to_csv(OUT / "cost_survivors_5bps.csv", index=False)
    surface[surface["fwer_strict"]].to_csv(OUT / "fwer_strict_candidates.csv", index=False)

    top = surface[surface["n"] >= MIN_N].head(80)
    raw_only = surface[(surface["context"] == "raw") & (surface["n"] >= MIN_N)].head(30)
    lines = [
        "# ETH 2025 Classical Candlestick Research V1",
        "",
        "## Frozen design",
        "",
        "- 55 directional reversal patterns: 30 bullish and 25 bearish, matching the Moser & Brauneis (2026) TA-Lib reversal-pattern universe.",
        "- TA-Lib definitions are used unchanged; no candle-shape threshold optimization.",
        "- ETHUSDT Binance 2025 data at 5-minute and 1-hour resolution, aligned one-to-one with BTCUSDT.",
        "- 5m horizons: 15, 30, 60, 120 minutes. 1h horizons: 1, 3, 6, 12, 24 hours.",
        "- Immediate entry: next candle open after pattern completion.",
        "- Confirmation entry: require the next candle body to agree with the pattern direction, then enter at the following candle open.",
        "- Context branches are pre-specified and never alter the TA-Lib pattern definition: trend, trailing-range location, joint volume/true-range activity, ETH/BTC relative trend, and combinations.",
        "- Signals are chronologically locked for the tested holding horizon to reduce overlapping-outcome dependence.",
        "- Primary round-trip cost sensitivity: 5 bps; stress: 9 bps.",
        "- Multiple testing: Benjamini-Hochberg FDR globally, BH within each pattern family, plus global Holm FWER.",
        "",
        "## Counts",
        "",
        f"Surface tests: {len(surface)}",
        f"Exploratory directional candidates (global BH q<=0.10 + >=3 positive quarters): {int(surface['exploratory_candidate'].sum())}",
        f"Candidates surviving 5 bps and >=3 positive net quarters: {int(surface['cost_survivor_5bps'].sum())}",
        f"Candidates surviving 9 bps stress: {int(surface['cost_survivor_9bps'].sum())}",
        f"Global Holm 5% FWER + 5 bps + stability survivors: {int(surface['fwer_strict'].sum())}",
        "",
        "## Highest-ranked tests (N>=30)",
        "",
        top[[
            "timeframe", "pattern", "direction", "horizon_minutes", "context", "entry_mode", "n",
            "mean_gross_bps", "mean_net_5bps", "mean_net_9bps", "mean_excess_vs_btc_bps",
            "positive_rate", "q_bh_global", "p_holm_global", "positive_quarters_net5",
        ]].to_markdown(index=False),
        "",
        "## Pattern-alone reference rows",
        "",
        raw_only[[
            "timeframe", "pattern", "direction", "horizon_minutes", "entry_mode", "n",
            "mean_gross_bps", "mean_net_5bps", "positive_rate", "q_bh_global", "positive_quarters_net5",
        ]].to_markdown(index=False),
        "",
        "## Interpretation rule",
        "",
        "No row is treated as a discovered strategy merely because it ranks highly. The next stage should use only the frozen survivors as hypotheses for a genuinely chronological out-of-sample replication and, later, an LLM context experiment.",
    ]
    (OUT / "RESULTS.md").write_text("\n".join(lines), encoding="utf-8")

    manifest = {
        "status": "PASS",
        "patterns": len(PATTERNS),
        "surface_tests": int(len(surface)),
        "exploratory_candidates": int(surface["exploratory_candidate"].sum()),
        "cost_survivors_5bps": int(surface["cost_survivor_5bps"].sum()),
        "cost_survivors_9bps": int(surface["cost_survivor_9bps"].sum()),
        "fwer_strict": int(surface["fwer_strict"].sum()),
        "cost_primary_bps": COST_PRIMARY_BPS,
        "cost_stress_bps": COST_STRESS_BPS,
        "random_seed": RNG_SEED,
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print("CANDLESTICK_RESEARCH_V1_PASS")
    print(json.dumps(manifest, sort_keys=True))


if __name__ == "__main__":
    main()
