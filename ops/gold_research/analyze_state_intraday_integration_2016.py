#!/usr/bin/env python3
"""Development-only integration audit: upper-layer state + intraday transmission, 2016.

Uses the already-frozen 2016 upper-layer state map from MACRO_STATE_2016_DEVELOPMENT_AUDIT_V1
and public Oanda M1 proxies. This is NOT validation because the state map itself was developed
with known 2016 history. No 2017 data is accessed.

Reports without optimizing:
  A) active state at every deterministic scheduled observation, every fixed checkpoint;
  B) intraday transmission alone at q90/q95 prior non-event control gates;
  C) intraday entries only when transmission agrees with active state;
  D) counter-state transmission as challenge diagnostics.

The deterministic stream is 44 Tier-A observations + all 8 FOMC minutes released in calendar 2016.
"""
from __future__ import annotations

import importlib.util
import json
import math
from pathlib import Path

import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent
BASE_SCRIPT = HERE / "run_oanda_macro_transition_replay_2016.py"
spec = importlib.util.spec_from_file_location("base_replay", BASE_SCRIPT)
br = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(br)

CHECKPOINTS = br.CHECKPOINTS
FORWARDS = br.FORWARD_HORIZONS
QUANTILES = br.CONTROL_QUANTILES

# Frozen before this numerical integration audit: derived from the prior qualitative 2016
# macro-state development audit. Timestamps are state boundaries, not fitted to this replay.
STATE_BOUNDARIES = [
    (pd.Timestamp("2016-01-27T19:00:00Z"), +1, "Jan-27 FOMC: bullish policy/risk episode starts"),
    (pd.Timestamp("2016-05-18T18:00:00Z"), -1, "May-18 FOMC minutes: bearish policy-path reversal"),
    (pd.Timestamp("2016-06-03T12:30:00Z"), +1, "Jun-03 payroll shock: bullish labour/Fed reversal"),
    (pd.Timestamp("2016-08-05T12:30:00Z"), -1, "Aug-05 payrolls: bearish policy-normalization reversal"),
]


def state_after(ts: pd.Timestamp) -> int:
    state = 0
    for boundary, new_state, _ in STATE_BOUNDARIES:
        if ts >= boundary:
            state = new_state
        else:
            break
    return state


def load_combined_manifest() -> pd.DataFrame:
    base = pd.read_csv(HERE / "2016_tier_a_event_manifest.csv")
    mins = pd.read_csv(HERE / "2016_tier_a_plus_fomc_minutes_manifest.csv")
    df = pd.concat([base, mins], ignore_index=True)
    df["event_time_utc"] = pd.to_datetime(df["event_time_utc"], utc=True)
    df = df.sort_values("event_time_utc").reset_index(drop=True)
    if len(df) != 52 or df["event_id"].duplicated().any() or df["event_time_utc"].dt.year.ne(2016).any():
        raise RuntimeError("COMBINED_EVENT_MANIFEST_CONTRACT_FAILED")
    return df


def summarize(series: pd.Series) -> dict:
    x = pd.to_numeric(series, errors="coerce").dropna()
    if x.empty:
        return {"n": 0, "mean_pct": math.nan, "median_pct": math.nan, "hit_rate": math.nan}
    return {
        "n": int(len(x)),
        "mean_pct": float(x.mean()),
        "median_pct": float(x.median()),
        "hit_rate": float((x > 0).mean()),
    }


def main() -> None:
    data_dir = Path.home() / ".cache/gold_research/oanda_2016"
    out_dir = Path.home() / ".cache/gold_research/state_intraday_integration_2016"
    out_dir.mkdir(parents=True, exist_ok=True)
    if "2017" in str(data_dir) or "2017" in str(out_dir):
        raise RuntimeError("PRESERVED_SAMPLE_GUARD")

    manifest = load_combined_manifest()
    observed, minute = {}, {}
    for alias, instrument in br.INSTRUMENTS.items():
        obs, one = br.load_instrument(data_dir, instrument)
        observed[alias], minute[alias] = obs, one

    event_dates = set(manifest["event_time_utc"].dt.normalize())

    # Recompute outcome-independent prior same-clock controls with all 52 event dates excluded.
    controls = []
    for ev in manifest.itertuples(index=False):
        for ctl_t0 in br.prior_control_times(ev.event_time_utc, event_dates):
            for h in CHECKPOINTS:
                r = br.measure_state(ctl_t0, h, minute)
                r.update({"anchor_event": ev.event_id, "anchor_type": ev.event_type})
                controls.append(r)
    controls = pd.DataFrame(controls)

    thresholds = []
    for h in CHECKPOINTS:
        elig = controls[(controls.checkpoint_min == h) & (controls.majority_direction != 0)]
        vals = elig.abs_net_transmission_z.replace([np.inf, -np.inf], np.nan).dropna()
        for q in QUANTILES:
            thresholds.append({
                "checkpoint_min": h,
                "quantile": q,
                "threshold_abs_net_z": float(vals.quantile(q)) if len(vals) else math.nan,
                "control_n": int(len(vals)),
            })
    thresholds = pd.DataFrame(thresholds)

    # Every fixed checkpoint, every deterministic event.
    rows = []
    for ev in manifest.itertuples(index=False):
        sdir = state_after(ev.event_time_utc)
        for h in CHECKPOINTS:
            r = br.measure_state(ev.event_time_utc, h, minute)
            entry = ev.event_time_utc + pd.Timedelta(minutes=h)
            r.update({"event_id": ev.event_id, "event_type": ev.event_type, "state_dir": sdir})
            for fwd in FORWARDS:
                raw = br.forward_gold_return(minute["XAU"], entry, fwd)
                r[f"XAU_forward_{fwd}m_pct"] = raw
                r[f"state_signed_forward_{fwd}m_pct"] = sdir * raw if sdir and np.isfinite(raw) else math.nan
                r[f"transmission_signed_forward_{fwd}m_pct"] = r["majority_direction"] * raw if r["majority_direction"] and np.isfinite(raw) else math.nan
            rows.append(r)
    fixed = pd.DataFrame(rows)

    # Baseline A: simply follow current state at every event, report ALL fixed checkpoints.
    summaries = []
    for h in CHECKPOINTS:
        sub = fixed[(fixed.checkpoint_min == h) & (fixed.state_dir != 0)]
        for fwd in FORWARDS:
            sm = summarize(sub[f"state_signed_forward_{fwd}m_pct"])
            summaries.append({"model": "STATE_EVERY_EVENT", "gate": "NONE", "checkpoint_or_entry": h, "forward_min": fwd, **sm})

    # Earliest alignment under both frozen control quantiles.
    entries = []
    for q in QUANTILES:
        gate = f"q{int(q*100)}"
        thmap = thresholds[thresholds["quantile"] == q].set_index("checkpoint_min")["threshold_abs_net_z"].to_dict()
        for ev in manifest.itertuples(index=False):
            sub = fixed[fixed.event_id == ev.event_id].sort_values("checkpoint_min")
            chosen = None
            for r in sub.itertuples(index=False):
                th = thmap.get(r.checkpoint_min, math.nan)
                if (
                    r.majority_direction != 0
                    and np.isfinite(th)
                    and r.abs_net_transmission_z >= th
                    and r.majority_strength > r.opposing_strength
                    and all(np.isfinite(getattr(r, f"{a}_z")) for a in br.PRIMARY)
                ):
                    chosen = r
                    break
            if chosen is None:
                entries.append({"gate": gate, "event_id": ev.event_id, "event_type": ev.event_type, "aligned": False, "state_dir": state_after(ev.event_time_utc)})
                continue
            rec = {
                "gate": gate,
                "event_id": ev.event_id,
                "event_type": ev.event_type,
                "aligned": True,
                "T_align_min": int(chosen.checkpoint_min),
                "transmission_dir": int(chosen.majority_direction),
                "state_dir": int(chosen.state_dir),
                "abs_net_transmission_z": float(chosen.abs_net_transmission_z),
                "XAU_event_return_pct": float(chosen.XAU_return_pct),
            }
            rec["relation"] = "NO_ACTIVE_STATE" if rec["state_dir"] == 0 else ("WITH_STATE" if rec["transmission_dir"] == rec["state_dir"] else "COUNTER_STATE")
            for fwd in FORWARDS:
                raw = float(getattr(chosen, f"XAU_forward_{fwd}m_pct"))
                rec[f"XAU_forward_{fwd}m_pct"] = raw
                rec[f"transmission_signed_forward_{fwd}m_pct"] = rec["transmission_dir"] * raw if np.isfinite(raw) else math.nan
                rec[f"state_signed_forward_{fwd}m_pct"] = rec["state_dir"] * raw if rec["state_dir"] and np.isfinite(raw) else math.nan
            entries.append(rec)
    entries = pd.DataFrame(entries)

    # B/C/D summaries at identical T_align timestamps.
    for gate in ("q90", "q95"):
        g = entries[(entries.gate == gate) & (entries.aligned == True)]  # noqa: E712
        for fwd in FORWARDS:
            for model, filt, col in [
                ("TRANSMISSION_ONLY", g.index == g.index, f"transmission_signed_forward_{fwd}m_pct"),
                ("STATE_AT_ALIGNED_EVENTS", g.state_dir != 0, f"state_signed_forward_{fwd}m_pct"),
                ("STATE_PLUS_TRANSMISSION", g.relation == "WITH_STATE", f"transmission_signed_forward_{fwd}m_pct"),
                ("COUNTER_STATE_CHALLENGE_AS_STATE", g.relation == "COUNTER_STATE", f"state_signed_forward_{fwd}m_pct"),
            ]:
                ss = g.loc[filt]
                sm = summarize(ss[col])
                summaries.append({"model": model, "gate": gate, "checkpoint_or_entry": "T_align", "forward_min": fwd, **sm})

    summary = pd.DataFrame(summaries)
    fixed.to_csv(out_dir / "fixed_checkpoint_all_events.csv", index=False)
    entries.to_csv(out_dir / "alignment_state_entries.csv", index=False)
    thresholds.to_csv(out_dir / "control_thresholds_52_events.csv", index=False)
    summary.to_csv(out_dir / "summary.csv", index=False)
    manifest.to_csv(out_dir / "combined_event_manifest.csv", index=False)

    audit = {
        "status": "DEVELOPMENT_ONLY_NOT_VALIDATION",
        "year": 2016,
        "event_count": 52,
        "preserved_2017_accessed": False,
        "state_map_source": "MACRO_STATE_2016_DEVELOPMENT_AUDIT_V1 (pre-existing qualitative development map)",
        "state_boundaries": [(str(t), d, note) for t, d, note in STATE_BOUNDARIES],
        "warning": "State map was developed with known 2016 history. Results assess representation coherence only and cannot establish out-of-sample edge.",
    }
    (out_dir / "audit_manifest.json").write_text(json.dumps(audit, indent=2) + "\n")

    print("GOLD_STATE_INTRADAY_2016_INTEGRATION_COMPLETE")
    print("\nTHRESHOLDS")
    print(thresholds.to_string(index=False))
    print("\nSUMMARY")
    print(summary.to_string(index=False))
    print("\nQ95 ENTRIES")
    print(entries[(entries.gate == 'q95') & (entries.aligned == True)][['event_id','event_type','T_align_min','transmission_dir','state_dir','relation','abs_net_transmission_z','XAU_forward_60m_pct','XAU_forward_240m_pct']].to_string(index=False))


if __name__ == "__main__":
    main()
