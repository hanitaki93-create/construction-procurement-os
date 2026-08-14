#!/usr/bin/env python3
"""2016 development-only macro-transition replay using public Oanda M1 archive.

Purpose
-------
Falsify/inspect the gold macro-transition representation before spending the
preserved 2017 sample or paid CME data.

This is NOT the final execution backtest. Oanda CFDs/proxies are used for the
same causal channels:
  XAU_USD     gold verdict
  USB02Y_USD  policy-sensitive/front-end bond price proxy
  USB10Y_USD  long nominal bond price proxy
  EUR_USD     inverse-USD proxy
  SPX500_USD  risk/equity context

Materiality is calibrated only from PRIOR same-clock non-event control windows,
never from later XAU returns. Two fixed control quantiles (90%, 95%) are
reported; neither is selected using gold P&L.

No 2017+ data is requested or read.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
from typing import Dict, Iterable, Optional

import numpy as np
import pandas as pd
import requests

YEAR = 2016
CHECKPOINTS = (5, 15, 30, 60, 120, 240)
FORWARD_HORIZONS = (60, 240)
CONTROL_LOOKBACK_DAYS = 10
MAX_FFILL_MINUTES = 30
PRE_EVENT_VOL_MINUTES = 240
MIN_VOL_RETURNS = 120
CONTROL_QUANTILES = (0.90, 0.95)

INSTRUMENTS = {
    "XAU": "XAU_USD",
    "B02": "USB02Y_USD",
    "B10": "USB10Y_USD",
    "EUR": "EUR_USD",
    "SPX": "SPX500_USD",
}
PRIMARY = ("B02", "B10", "EUR")
# Positive bond-price returns ~= lower yields; positive EUR/USD ~= weaker USD.
# All three positive directions are therefore mapped as gold-supportive.
SUPPORTIVE_MULTIPLIER = {"B02": 1.0, "B10": 1.0, "EUR": 1.0}

RAW_ROOT = (
    "https://raw.githubusercontent.com/FutureSharks/financial-data/master/"
    "pyfinancialdata/data/currencies/oanda"
)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for block in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def download_year(data_dir: Path) -> pd.DataFrame:
    data_dir.mkdir(parents=True, exist_ok=True)
    inventory = []
    session = requests.Session()
    session.headers.update({"User-Agent": "gold-macro-research/2016-development"})

    for alias, instrument in INSTRUMENTS.items():
        for month in range(1, 13):
            name = f"oanda-{instrument}-{YEAR}-{month}.csv"
            url = f"{RAW_ROOT}/{instrument}/{YEAR}/{name}"
            path = data_dir / name
            if not path.exists() or path.stat().st_size == 0:
                r = session.get(url, timeout=90)
                r.raise_for_status()
                path.write_bytes(r.content)
            inventory.append(
                {
                    "alias": alias,
                    "instrument": instrument,
                    "month": month,
                    "file": name,
                    "bytes": path.stat().st_size,
                    "sha256": sha256(path),
                    "source_url": url,
                }
            )
    inv = pd.DataFrame(inventory)
    inv.to_csv(data_dir / "source_inventory.csv", index=False)
    return inv


def load_instrument(data_dir: Path, instrument: str) -> tuple[pd.Series, pd.Series]:
    frames = []
    for month in range(1, 13):
        path = data_dir / f"oanda-{instrument}-{YEAR}-{month}.csv"
        df = pd.read_csv(path, usecols=["time", "close"])
        df["time"] = pd.to_datetime(df["time"], utc=True, errors="coerce")
        df["close"] = pd.to_numeric(df["close"], errors="coerce")
        frames.append(df.dropna())
    raw = pd.concat(frames, ignore_index=True).drop_duplicates("time", keep="last")
    raw = raw.sort_values("time").set_index("time")
    observed = raw["close"].astype(float)

    start = pd.Timestamp(f"{YEAR}-01-01T00:00:00Z")
    end = pd.Timestamp(f"{YEAR}-12-31T23:59:00Z")
    grid = pd.date_range(start, end, freq="1min")
    minute = observed.reindex(grid).ffill(limit=MAX_FFILL_MINUTES)
    minute.name = instrument
    return observed, minute


def robust_sigma(minute: pd.Series, t0: pd.Timestamp) -> float:
    start = t0 - pd.Timedelta(minutes=PRE_EVENT_VOL_MINUTES)
    window = minute.loc[start : t0 - pd.Timedelta(minutes=1)]
    logret = np.log(window).diff().replace([np.inf, -np.inf], np.nan).dropna()
    if len(logret) < MIN_VOL_RETURNS:
        return math.nan
    med = float(logret.median())
    mad = float((logret - med).abs().median())
    sig = 1.4826 * mad
    # Zero-heavy quoted CFDs can produce MAD=0. Fall back to ordinary sigma.
    if not np.isfinite(sig) or sig <= 0:
        sig = float(logret.std(ddof=1))
    return sig if np.isfinite(sig) and sig > 0 else math.nan


def value_at(minute: pd.Series, ts: pd.Timestamp) -> float:
    try:
        v = minute.loc[ts]
    except KeyError:
        return math.nan
    return float(v) if pd.notna(v) else math.nan


def quote_age_minutes(observed: pd.Series, ts: pd.Timestamp) -> float:
    pos = observed.index.searchsorted(ts, side="right") - 1
    if pos < 0:
        return math.nan
    last = observed.index[pos]
    return float((ts - last) / pd.Timedelta(minutes=1))


def mapped_sign(v: float) -> int:
    if not np.isfinite(v) or abs(v) < 1e-15:
        return 0
    return 1 if v > 0 else -1


def measure_state(
    t0: pd.Timestamp,
    horizon_min: int,
    minute: Dict[str, pd.Series],
) -> dict:
    target = t0 + pd.Timedelta(minutes=horizon_min)
    result = {
        "t0": t0,
        "checkpoint_min": horizon_min,
        "target": target,
    }
    z_by_channel = {}
    mapped_by_channel = {}

    for alias in INSTRUMENTS:
        s = minute[alias]
        p0 = value_at(s, t0 - pd.Timedelta(minutes=1))
        p1 = value_at(s, target)
        if np.isfinite(p0) and p0 > 0 and np.isfinite(p1) and p1 > 0:
            lr = math.log(p1 / p0)
            pct = (p1 / p0 - 1.0) * 100.0
        else:
            lr = math.nan
            pct = math.nan
        sig = robust_sigma(s, t0)
        z = lr / (sig * math.sqrt(horizon_min)) if np.isfinite(lr) and np.isfinite(sig) else math.nan
        result[f"{alias}_return_pct"] = pct
        result[f"{alias}_z"] = z
        if alias in PRIMARY:
            mapped = z * SUPPORTIVE_MULTIPLIER[alias] if np.isfinite(z) else math.nan
            z_by_channel[alias] = z
            mapped_by_channel[alias] = mapped

    supportive = sum(mapped_sign(v) > 0 for v in mapped_by_channel.values())
    hostile = sum(mapped_sign(v) < 0 for v in mapped_by_channel.values())
    majority = 1 if supportive >= 2 else (-1 if hostile >= 2 else 0)
    supportive_strength = sum(abs(v) for v in mapped_by_channel.values() if np.isfinite(v) and v > 0)
    hostile_strength = sum(abs(v) for v in mapped_by_channel.values() if np.isfinite(v) and v < 0)
    net = sum(v for v in mapped_by_channel.values() if np.isfinite(v))

    result.update(
        {
            "supportive_count": supportive,
            "hostile_count": hostile,
            "majority_direction": majority,
            "supportive_strength": supportive_strength,
            "hostile_strength": hostile_strength,
            "net_transmission_z": net,
            "abs_net_transmission_z": abs(net),
            "majority_strength": supportive_strength if majority > 0 else hostile_strength if majority < 0 else 0.0,
            "opposing_strength": hostile_strength if majority > 0 else supportive_strength if majority < 0 else max(supportive_strength, hostile_strength),
        }
    )
    return result


def prior_control_times(t0: pd.Timestamp, event_dates: set[pd.Timestamp]) -> list[pd.Timestamp]:
    controls = []
    cursor = t0 - pd.Timedelta(days=1)
    while len(controls) < CONTROL_LOOKBACK_DAYS and cursor >= pd.Timestamp(f"{YEAR}-01-01T00:00:00Z"):
        if cursor.weekday() < 5 and cursor.normalize() not in event_dates:
            controls.append(cursor)
        cursor -= pd.Timedelta(days=1)
    return controls


def forward_gold_return(minute: pd.Series, entry: pd.Timestamp, horizon_min: int) -> float:
    p0 = value_at(minute, entry)
    p1 = value_at(minute, entry + pd.Timedelta(minutes=horizon_min))
    if not (np.isfinite(p0) and p0 > 0 and np.isfinite(p1) and p1 > 0):
        return math.nan
    return (p1 / p0 - 1.0) * 100.0


def summarize_signed(values: pd.Series) -> dict:
    values = values.dropna()
    if values.empty:
        return {"n": 0, "mean": math.nan, "median": math.nan, "hit_rate": math.nan}
    return {
        "n": int(len(values)),
        "mean": float(values.mean()),
        "median": float(values.median()),
        "hit_rate": float((values > 0).mean()),
    }


def run(manifest_path: Path, data_dir: Path, output_dir: Path) -> None:
    if "2017" in str(data_dir) or "2017" in str(output_dir):
        raise RuntimeError("PRESERVED_SAMPLE_PATH_GUARD")

    inventory = download_year(data_dir)
    manifest = pd.read_csv(manifest_path)
    manifest["event_time_utc"] = pd.to_datetime(manifest["event_time_utc"], utc=True)
    if len(manifest) != 44 or manifest["event_time_utc"].dt.year.ne(YEAR).any():
        raise RuntimeError(f"EVENT_MANIFEST_CONTRACT count={len(manifest)}")

    observed: Dict[str, pd.Series] = {}
    minute: Dict[str, pd.Series] = {}
    for alias, instrument in INSTRUMENTS.items():
        obs, one = load_instrument(data_dir, instrument)
        observed[alias] = obs
        minute[alias] = one

    event_dates = set(manifest["event_time_utc"].dt.normalize())

    # Control distribution: same UTC clock on the 10 prior non-event weekdays.
    control_rows = []
    for event in manifest.itertuples(index=False):
        for ctl_t0 in prior_control_times(event.event_time_utc, event_dates):
            for h in CHECKPOINTS:
                row = measure_state(ctl_t0, h, minute)
                row.update({"anchor_event": event.event_id, "control_t0": ctl_t0})
                control_rows.append(row)
    controls = pd.DataFrame(control_rows)

    thresholds = []
    for h in CHECKPOINTS:
        eligible = controls[(controls.checkpoint_min == h) & (controls.majority_direction != 0)]
        vals = eligible.abs_net_transmission_z.replace([np.inf, -np.inf], np.nan).dropna()
        for q in CONTROL_QUANTILES:
            thresholds.append(
                {
                    "checkpoint_min": h,
                    "quantile": q,
                    "threshold_abs_net_z": float(vals.quantile(q)) if len(vals) else math.nan,
                    "control_n": int(len(vals)),
                }
            )
    thresholds_df = pd.DataFrame(thresholds)

    # Raw event replay.
    event_rows = []
    for event in manifest.itertuples(index=False):
        for h in CHECKPOINTS:
            row = measure_state(event.event_time_utc, h, minute)
            row.update({"event_id": event.event_id, "event_type": event.event_type})
            for alias in INSTRUMENTS:
                row[f"{alias}_baseline_quote_age_min"] = quote_age_minutes(
                    observed[alias], event.event_time_utc - pd.Timedelta(minutes=1)
                )
                row[f"{alias}_checkpoint_quote_age_min"] = quote_age_minutes(
                    observed[alias], event.event_time_utc + pd.Timedelta(minutes=h)
                )
            event_rows.append(row)
    events = pd.DataFrame(event_rows)

    # Apply both PRE-FROZEN control quantiles. The threshold is independent of XAU outcome.
    align_rows = []
    for q in CONTROL_QUANTILES:
        qname = f"q{int(q*100)}"
        thmap = thresholds_df[thresholds_df.quantile == q].set_index("checkpoint_min")["threshold_abs_net_z"].to_dict()
        for event in manifest.itertuples(index=False):
            sub = events[events.event_id == event.event_id].sort_values("checkpoint_min")
            chosen = None
            for row in sub.itertuples(index=False):
                threshold = thmap.get(row.checkpoint_min, math.nan)
                valid_majority = row.majority_direction != 0
                material = np.isfinite(threshold) and row.abs_net_transmission_z >= threshold
                dominance = row.majority_strength > row.opposing_strength
                # Require front-end and long-end/USD panel to be observable; max ffill prevents very stale use.
                channel_ok = all(np.isfinite(getattr(row, f"{a}_z")) for a in PRIMARY)
                if valid_majority and material and dominance and channel_ok:
                    chosen = row
                    break
            if chosen is None:
                align_rows.append(
                    {
                        "gate": qname,
                        "event_id": event.event_id,
                        "event_type": event.event_type,
                        "aligned": False,
                    }
                )
                continue

            entry = event.event_time_utc + pd.Timedelta(minutes=int(chosen.checkpoint_min))
            direction = int(chosen.majority_direction)
            xau_event_ret = float(chosen.XAU_return_pct) if np.isfinite(chosen.XAU_return_pct) else math.nan
            xau_event_sign = mapped_sign(xau_event_ret)
            record = {
                "gate": qname,
                "event_id": event.event_id,
                "event_type": event.event_type,
                "aligned": True,
                "T_align_min": int(chosen.checkpoint_min),
                "direction": direction,
                "net_transmission_z": float(chosen.net_transmission_z),
                "abs_net_transmission_z": float(chosen.abs_net_transmission_z),
                "majority_strength": float(chosen.majority_strength),
                "opposing_strength": float(chosen.opposing_strength),
                "XAU_event_return_pct": xau_event_ret,
                "XAU_event_sign": xau_event_sign,
                "macro_vs_initial_gold": "CONFIRM" if xau_event_sign == direction else "RESIST" if xau_event_sign == -direction else "UNRESOLVED",
            }
            for fwd in FORWARD_HORIZONS:
                raw = forward_gold_return(minute["XAU"], entry, fwd)
                record[f"XAU_forward_{fwd}m_pct"] = raw
                record[f"macro_signed_forward_{fwd}m_pct"] = direction * raw if np.isfinite(raw) else math.nan
                record[f"gold_momentum_signed_forward_{fwd}m_pct"] = xau_event_sign * raw if xau_event_sign != 0 and np.isfinite(raw) else math.nan
            align_rows.append(record)
    align = pd.DataFrame(align_rows)

    # Summaries without choosing a preferred gate/horizon.
    summaries = []
    for gate in ("q90", "q95"):
        g = align[(align.gate == gate) & (align.aligned == True)].copy()  # noqa: E712
        base = {"gate": gate, "scope": "ALL", "event_type": "ALL", "aligned_events": int(len(g))}
        for fwd in FORWARD_HORIZONS:
            m = summarize_signed(g[f"macro_signed_forward_{fwd}m_pct"] if len(g) else pd.Series(dtype=float))
            mom = summarize_signed(g[f"gold_momentum_signed_forward_{fwd}m_pct"] if len(g) else pd.Series(dtype=float))
            base.update(
                {
                    f"macro_{fwd}m_n": m["n"],
                    f"macro_{fwd}m_mean_pct": m["mean"],
                    f"macro_{fwd}m_median_pct": m["median"],
                    f"macro_{fwd}m_hit_rate": m["hit_rate"],
                    f"gold_momentum_{fwd}m_mean_pct": mom["mean"],
                    f"gold_momentum_{fwd}m_hit_rate": mom["hit_rate"],
                }
            )
        if len(g):
            base["median_T_align_min"] = float(g.T_align_min.median())
            base["mean_T_align_min"] = float(g.T_align_min.mean())
            base["macro_initial_confirm_rate"] = float(g.macro_vs_initial_gold.eq("CONFIRM").mean())
        summaries.append(base)
        for etype, e in g.groupby("event_type"):
            row = {"gate": gate, "scope": "EVENT_TYPE", "event_type": etype, "aligned_events": int(len(e))}
            for fwd in FORWARD_HORIZONS:
                m = summarize_signed(e[f"macro_signed_forward_{fwd}m_pct"])
                row.update(
                    {
                        f"macro_{fwd}m_n": m["n"],
                        f"macro_{fwd}m_mean_pct": m["mean"],
                        f"macro_{fwd}m_median_pct": m["median"],
                        f"macro_{fwd}m_hit_rate": m["hit_rate"],
                    }
                )
            summaries.append(row)
    summary = pd.DataFrame(summaries)

    # Data-quality / coverage audit.
    quality = []
    for alias, instrument in INSTRUMENTS.items():
        obs = observed[alias]
        quality.append(
            {
                "alias": alias,
                "instrument": instrument,
                "observed_quotes": int(len(obs)),
                "first_ts": obs.index.min(),
                "last_ts": obs.index.max(),
                "median_gap_min": float(obs.index.to_series().diff().dropna().median() / pd.Timedelta(minutes=1)),
                "p95_gap_min": float(obs.index.to_series().diff().dropna().quantile(0.95) / pd.Timedelta(minutes=1)),
            }
        )
    quality_df = pd.DataFrame(quality)

    output_dir.mkdir(parents=True, exist_ok=True)
    controls.to_csv(output_dir / "control_windows.csv.gz", index=False, compression="gzip")
    thresholds_df.to_csv(output_dir / "control_thresholds.csv", index=False)
    events.to_csv(output_dir / "event_checkpoint_replay.csv", index=False)
    align.to_csv(output_dir / "event_alignment_entries.csv", index=False)
    summary.to_csv(output_dir / "summary.csv", index=False)
    quality_df.to_csv(output_dir / "data_quality.csv", index=False)
    inventory.to_csv(output_dir / "source_inventory.csv", index=False)

    result = {
        "status": "DEVELOPMENT_ONLY",
        "year": YEAR,
        "events": int(len(manifest)),
        "preserved_2017_accessed": False,
        "source": "FutureSharks/financial-data Oanda M1 archive",
        "instruments": INSTRUMENTS,
        "checkpoints_minutes": CHECKPOINTS,
        "control_quantiles": CONTROL_QUANTILES,
        "control_lookback_non_event_weekdays": CONTROL_LOOKBACK_DAYS,
        "max_forward_fill_minutes": MAX_FFILL_MINUTES,
        "notes": [
            "Oanda bond CFDs are development proxies, not CME execution data.",
            "Materiality thresholds are derived only from prior same-clock non-event control windows.",
            "No gate or horizon is selected from XAU outcomes.",
            "2017 remains preserved.",
        ],
        "files": {},
    }
    for p in sorted(output_dir.iterdir()):
        if p.is_file():
            result["files"][p.name] = {"bytes": p.stat().st_size, "sha256": sha256(p)}
    (output_dir / "manifest.json").write_text(json.dumps(result, indent=2, default=str) + "\n", encoding="utf-8")

    print("GOLD_OANDA_2016_REPLAY_COMPLETE")
    print(quality_df.to_string(index=False))
    print("\nCONTROL THRESHOLDS")
    print(thresholds_df.to_string(index=False))
    print("\nSUMMARY")
    print(summary.to_string(index=False))


def self_test() -> None:
    # Core sign/direction check.
    assert mapped_sign(0.1) == 1
    assert mapped_sign(-0.1) == -1
    assert mapped_sign(0.0) == 0
    # No 2017 constants or data paths may enter the development runner.
    assert YEAR == 2016
    assert all("2017" not in instrument for instrument in INSTRUMENTS.values())
    print("GOLD_OANDA_MACRO_TRANSITION_REPLAY_SELFTEST_PASS")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=Path(__file__).with_name("2016_tier_a_event_manifest.csv"))
    parser.add_argument("--data-dir", type=Path, default=Path("/tmp/gold_oanda_2016_data"))
    parser.add_argument("--output-dir", type=Path, default=Path("/tmp/gold_oanda_2016_results"))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        run(args.manifest, args.data_dir, args.output_dir)


if __name__ == "__main__":
    main()
