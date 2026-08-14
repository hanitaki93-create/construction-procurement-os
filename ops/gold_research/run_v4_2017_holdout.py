#!/usr/bin/env python3
"""Gold V4 2017 near-held-out run.

Frozen before opening 2017 XAU outcomes:
- same 52-event scheduled universe as development categories;
- exact 2016 numeric q90/q95/q99 thresholds (NO 2017 recalibration);
- same q95/q99/4h state logic;
- carry-in state/exposure = bearish (-1) from the 2016 Aug-05 state.

2017 is near-held-out rather than perfectly blind because several 2017 FOMC
policy-input rows were incidentally visible during 2016 research. Those values
are NOT used here. No 2017 gold outcome was used in development.
"""
from __future__ import annotations

import importlib.util
import json
import math
import hashlib
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional

import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent
BASE_SCRIPT = HERE / "run_oanda_macro_transition_replay_2016.py"
spec = importlib.util.spec_from_file_location("base_replay", BASE_SCRIPT)
br = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(br)

YEAR = 2017
br.YEAR = YEAR
CHECKPOINTS = (5, 15, 30, 60, 120, 240)
RETENTION_MIN = 240
FORWARD_DIAGNOSTICS = (60, 240)

# Frozen exact values from 2016 development controls. No 2017 control windows.
TH90 = {
    5: 9.688231, 15: 7.432259, 30: 5.783769,
    60: 4.382427, 120: 4.689672, 240: 3.994845,
}
TH95 = {
    5: 16.047702, 15: 11.554154, 30: 7.185086,
    60: 6.359880, 120: 6.438019, 240: 5.327708,
}
TH99 = {
    5: 32.183725, 15: 18.718249, 30: 22.074094,
    60: 16.167450, 120: 13.337944, 240: 10.659989,
}

INITIAL_STATE = -1
INITIAL_EXPOSURE = -1
INITIAL_PHASE = "ACTIVE_STRONG"


@dataclass
class Action:
    ts: pd.Timestamp
    exposure: int
    reason: str
    event_id: str
    state_after: int


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for block in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def load_manifest() -> pd.DataFrame:
    p = HERE / "2017_holdout_event_manifest.csv"
    df = pd.read_csv(p)
    df["event_time_utc"] = pd.to_datetime(df["event_time_utc"], utc=True)
    df = df.sort_values("event_time_utc").reset_index(drop=True)
    expected = {"NFP": 12, "CPI": 12, "PCE": 12, "FOMC": 8, "FOMC_MINUTES": 8}
    got = df.event_type.value_counts().to_dict()
    if len(df) != 52 or got != expected or df.event_time_utc.dt.year.ne(YEAR).any() or df.event_id.duplicated().any():
        raise RuntimeError(f"2017_MANIFEST_CONTRACT_FAILED count={len(df)} types={got}")
    return df


def first_alignment(event_time: pd.Timestamp, minute: Dict[str, pd.Series]) -> Optional[dict]:
    for h in CHECKPOINTS:
        r = br.measure_state(event_time, h, minute)
        channel_ok = all(np.isfinite(r[f"{a}_z"]) for a in br.PRIMARY)
        if (
            r["majority_direction"] != 0
            and channel_ok
            and r["abs_net_transmission_z"] >= TH95[h]
            and r["majority_strength"] > r["opposing_strength"]
        ):
            out = dict(r)
            out["is_q99"] = bool(r["abs_net_transmission_z"] >= TH99[h])
            return out
    return None


def retention_check(ev_time: pd.Timestamp, align: dict, minute: Dict[str, pd.Series]) -> dict:
    direction = int(align["majority_direction"])
    entry_ts = ev_time + pd.Timedelta(minutes=int(align["checkpoint_min"]))
    gold_fwd = br.forward_gold_return(minute["XAU"], entry_ts, RETENTION_MIN)
    gold_retained = np.isfinite(gold_fwd) and direction * gold_fwd > 0
    macro240 = br.measure_state(ev_time, RETENTION_MIN, minute)
    macro_retained = (
        macro240["majority_direction"] == direction
        and macro240["abs_net_transmission_z"] >= TH90[240]
        and macro240["majority_strength"] > macro240["opposing_strength"]
    )
    return {
        "retained": bool(gold_retained and macro_retained),
        "gold_forward_240m_from_Talign_pct": gold_fwd,
        "macro240_direction": int(macro240["majority_direction"]),
        "macro240_abs_net_z": float(macro240["abs_net_transmission_z"]),
        "gold_retained": bool(gold_retained),
        "macro_retained": bool(macro_retained),
    }


def add_action(actions: List[Action], ts: pd.Timestamp, exposure: int, reason: str, event_id: str, state: int) -> None:
    if actions and ts < actions[-1].ts:
        raise RuntimeError("NON_MONOTONIC_ACTION")
    if actions and actions[-1].ts == ts and actions[-1].exposure == exposure:
        return
    actions.append(Action(ts, exposure, reason, event_id, state))


def xau_price(minute: pd.Series, ts: pd.Timestamp) -> float:
    return br.value_at(minute, ts)


def episode_return(direction: int, p0: float, p1: float) -> float:
    if not (np.isfinite(p0) and p0 > 0 and np.isfinite(p1) and p1 > 0):
        return math.nan
    return direction * (p1 / p0 - 1.0)


def max_drawdown(eq: pd.Series) -> float:
    return float((eq / eq.cummax() - 1.0).min())


def stats(x: pd.Series) -> dict:
    x = pd.to_numeric(x, errors="coerce").dropna()
    return {
        "n": int(len(x)),
        "mean_pct": float(x.mean()) if len(x) else math.nan,
        "median_pct": float(x.median()) if len(x) else math.nan,
        "hit_rate": float((x > 0).mean()) if len(x) else math.nan,
    }


def main() -> None:
    manifest = load_manifest()
    data_dir = Path.home() / ".cache/gold_research/oanda_2017_holdout"
    out_dir = Path.home() / ".cache/gold_research/v4_2017_holdout"
    out_dir.mkdir(parents=True, exist_ok=True)

    # First actual access to 2017 market outcomes occurs here.
    inventory = br.download_year(data_dir)
    observed: Dict[str, pd.Series] = {}
    minute: Dict[str, pd.Series] = {}
    for alias, instrument in br.INSTRUMENTS.items():
        obs, one = br.load_instrument(data_dir, instrument)
        observed[alias], minute[alias] = obs, one

    # Data contract.
    for alias, obs in observed.items():
        if len(obs) == 0 or obs.index.min().year != YEAR or obs.index.max().year != YEAR:
            raise RuntimeError(f"DATA_YEAR_CONTRACT {alias} first={obs.index.min()} last={obs.index.max()}")

    state = INITIAL_STATE
    exposure = INITIAL_EXPOSURE
    phase = INITIAL_PHASE
    retained_counter_count = 0
    flat_candidate_dir = 0
    flat_candidate_count = 0

    # Carry-in exposure begins at first observed 2017 XAU quote.
    first_ts = observed["XAU"].index.min()
    actions: List[Action] = [Action(first_ts, INITIAL_EXPOSURE, "CARRY_IN_2016_BEAR_STATE", "2016_CARRY", state)]
    ledger = []
    tactical = []

    for ev in manifest.itertuples(index=False):
        align = first_alignment(ev.event_time_utc, minute)
        before_state = state
        before_phase = phase
        rec = {
            "event_id": ev.event_id,
            "event_type": ev.event_type,
            "event_time_utc": ev.event_time_utc,
            "state_before": before_state,
            "phase_before": before_phase,
            "aligned": align is not None,
        }
        if align is None:
            rec.update({"classification": "NO_Q95_SIGNAL", "state_after": state, "phase_after": phase})
            ledger.append(rec)
            continue

        direction = int(align["majority_direction"])
        talign = ev.event_time_utc + pd.Timedelta(minutes=int(align["checkpoint_min"]))
        retain = retention_check(ev.event_time_utc, align, minute)
        is_q99 = bool(align["is_q99"])

        rec.update({
            "T_align_min": int(align["checkpoint_min"]),
            "T_align_utc": talign,
            "signal_dir": direction,
            "abs_net_transmission_z": float(align["abs_net_transmission_z"]),
            "is_q99": is_q99,
            **retain,
        })

        # Holdout tactical diagnostics are measured at the decision-available T_align.
        tact = {
            "event_id": ev.event_id,
            "event_type": ev.event_type,
            "T_align_min": int(align["checkpoint_min"]),
            "signal_dir": direction,
            "state_before": before_state,
            "relation": "NO_ACTIVE_STATE" if before_state == 0 else ("WITH_STATE" if direction == before_state else "COUNTER_STATE"),
            "is_q99": is_q99,
        }
        for fwd in FORWARD_DIAGNOSTICS:
            raw = br.forward_gold_return(minute["XAU"], talign, fwd)
            tact[f"XAU_forward_{fwd}m_pct"] = raw
            tact[f"transmission_signed_forward_{fwd}m_pct"] = direction * raw if np.isfinite(raw) else math.nan
            tact[f"state_signed_forward_{fwd}m_pct"] = before_state * raw if before_state and np.isfinite(raw) else math.nan
        tactical.append(tact)

        if state == 0:
            if retain["retained"]:
                if is_q99:
                    state = direction
                    phase = "ACTIVE_STRONG"
                    retained_counter_count = 0
                    flat_candidate_count = 0
                    start_ts = ev.event_time_utc + pd.Timedelta(minutes=RETENTION_MIN)
                    exposure = state
                    add_action(actions, start_ts, exposure, "START_Q99_RETAINED", ev.event_id, state)
                    rec["classification"] = "START_Q99_RETAINED"
                else:
                    if direction == flat_candidate_dir:
                        flat_candidate_count += 1
                    else:
                        flat_candidate_dir = direction
                        flat_candidate_count = 1
                    if flat_candidate_count >= 2:
                        state = direction
                        phase = "ACTIVE_STRONG"
                        start_ts = ev.event_time_utc + pd.Timedelta(minutes=RETENTION_MIN)
                        exposure = state
                        add_action(actions, start_ts, exposure, "START_2X_Q95_RETAINED", ev.event_id, state)
                        rec["classification"] = "START_2X_Q95_RETAINED"
                        flat_candidate_count = 0
                    else:
                        phase = "CANDIDATE"
                        rec["classification"] = "FLAT_Q95_RETAINED_CANDIDATE"
            else:
                flat_candidate_count = 0
                flat_candidate_dir = 0
                rec["classification"] = "FLAT_SIGNAL_NOT_RETAINED"
        elif direction == state:
            retained_counter_count = 0
            phase = "ACTIVE_STRONG"
            rec["classification"] = "REINFORCE"
            if exposure == 0:
                exposure = state
                add_action(actions, talign, exposure, "RESTORE_ON_REINFORCE", ev.event_id, state)
        else:
            rec["classification"] = "CHALLENGE"
            phase = "CHALLENGED"
            if is_q99 and exposure != 0:
                exposure = 0
                add_action(actions, talign, 0, "FLATTEN_Q99_COUNTER", ev.event_id, state)

            if retain["retained"]:
                retained_counter_count += 1
                if is_q99 or retained_counter_count >= 2:
                    state = direction
                    phase = "ACTIVE_STRONG"
                    reverse_ts = ev.event_time_utc + pd.Timedelta(minutes=RETENTION_MIN)
                    exposure = state
                    reason = "REVERSE_Q99_RETAINED" if is_q99 else "REVERSE_2X_Q95_RETAINED"
                    add_action(actions, reverse_ts, exposure, reason, ev.event_id, state)
                    retained_counter_count = 0
                    rec["classification"] = reason
                else:
                    phase = "REVERSAL_READY"
                    rec["classification"] = "REVERSAL_READY_Q95_RETAINED"
            else:
                retained_counter_count = 0
                if is_q99 and exposure == 0:
                    restore_ts = ev.event_time_utc + pd.Timedelta(minutes=RETENTION_MIN)
                    exposure = state
                    add_action(actions, restore_ts, exposure, "RESTORE_FAILED_Q99_CHALLENGE", ev.event_id, state)
                    phase = "ACTIVE_STRONG"
                    rec["classification"] = "FAILED_Q99_CHALLENGE_RESTORE"

        rec["state_after"] = state
        rec["phase_after"] = phase
        rec["exposure_after_processing"] = exposure
        ledger.append(rec)

    ledger_df = pd.DataFrame(ledger)
    tactical_df = pd.DataFrame(tactical)

    # Accounting close only; state remains whatever algorithm derived.
    year_end_ts = observed["XAU"].index.max()
    if actions[-1].ts < year_end_ts and actions[-1].exposure != 0:
        actions.append(Action(year_end_ts, 0, "YEAR_END_MARK", "YEAR_END", state))
    actions_df = pd.DataFrame([a.__dict__ for a in actions])

    # Exposure episodes.
    trades = []
    open_ts = None
    open_px = None
    open_dir = 0
    open_reason = None
    open_event = None
    for a in actions:
        px = xau_price(minute["XAU"], a.ts)
        if open_dir != 0 and a.exposure != open_dir:
            trades.append({
                "entry_ts": open_ts,
                "exit_ts": a.ts,
                "direction": open_dir,
                "entry_price": open_px,
                "exit_price": px,
                "simple_return": episode_return(open_dir, open_px, px),
                "entry_reason": open_reason,
                "entry_event": open_event,
                "exit_reason": a.reason,
                "exit_event": a.event_id,
            })
            open_dir = 0
            open_ts = open_px = open_reason = open_event = None
        if a.exposure != 0 and a.exposure != open_dir:
            open_dir = a.exposure
            open_ts = a.ts
            open_px = px
            open_reason = a.reason
            open_event = a.event_id
    trades_df = pd.DataFrame(trades)

    # Mark-to-market equity on observed XAU quotes.
    equity = 1.0
    current_exp = 0
    entry_equity = equity
    entry_price = math.nan
    ai = 0
    action_records = actions_df.to_dict("records")
    curve_rows = []
    for ts, price in observed["XAU"].items():
        while ai < len(action_records) and action_records[ai]["ts"] <= ts:
            a = action_records[ai]
            if current_exp != 0 and np.isfinite(entry_price):
                equity = entry_equity * (1.0 + current_exp * (float(price) / entry_price - 1.0))
            current_exp = int(a["exposure"])
            entry_equity = equity
            entry_price = float(price) if current_exp != 0 else math.nan
            ai += 1
        mark = entry_equity * (1.0 + current_exp * (float(price) / entry_price - 1.0)) if current_exp != 0 else equity
        curve_rows.append((ts, float(price), current_exp, mark))
    curve = pd.DataFrame(curve_rows, columns=["ts","xau","exposure","equity"]).set_index("ts")

    # Benchmarks and cost sensitivity.
    final_ret = float(curve.equity.iloc[-1] - 1.0)
    mdd = max_drawdown(curve.equity)
    active_fraction = float((curve.exposure != 0).mean())
    always_long = float(observed["XAU"].iloc[-1] / observed["XAU"].iloc[0] - 1.0)
    gross_compound = float((1.0 + trades_df.simple_return).prod() - 1.0) if len(trades_df) else math.nan
    cost_rows = []
    for bps in (2, 5, 10, 20):
        c = bps / 10000.0
        net = float((1.0 + (trades_df.simple_return - c)).prod() - 1.0) if len(trades_df) else math.nan
        cost_rows.append({"round_trip_cost_bps_per_episode": bps, "net_compounded_return": net})
    costs_df = pd.DataFrame(cost_rows)

    # Tactical diagnostics, reported without selecting a winner.
    tactical_summary = []
    if len(tactical_df):
        for scope, filt in [
            ("ALL_Q95_TRANSMISSION", tactical_df.index == tactical_df.index),
            ("WITH_STATE_Q95", tactical_df.relation == "WITH_STATE"),
            ("COUNTER_STATE_Q95", tactical_df.relation == "COUNTER_STATE"),
        ]:
            sub = tactical_df.loc[filt]
            for fwd in FORWARD_DIAGNOSTICS:
                col = f"transmission_signed_forward_{fwd}m_pct" if scope != "COUNTER_STATE_Q95" else f"state_signed_forward_{fwd}m_pct"
                tactical_summary.append({"scope": scope, "forward_min": fwd, **stats(sub[col])})
    tactical_summary_df = pd.DataFrame(tactical_summary)

    transitions = ledger_df[ledger_df.classification.astype(str).str.startswith(("START_", "REVERSE_"), na=False)].copy()
    q99_challenges = ledger_df[(ledger_df.aligned == True) & (ledger_df.is_q99 == True) & (ledger_df.state_before != ledger_df.signal_dir)].copy() if "is_q99" in ledger_df else pd.DataFrame()

    # Dependence on best episode: remove best trade once, no re-optimization.
    if len(trades_df):
        best_idx = trades_df.simple_return.idxmax()
        without_best = trades_df.drop(index=best_idx)
        compound_without_best = float((1.0 + without_best.simple_return).prod() - 1.0) if len(without_best) else 0.0
        win_rate = float((trades_df.simple_return > 0).mean())
        mean_trade = float(trades_df.simple_return.mean())
        median_trade = float(trades_df.simple_return.median())
    else:
        compound_without_best = win_rate = mean_trade = median_trade = math.nan

    summary = {
        "status": "2017_NEAR_HELD_OUT_NO_TUNING",
        "year": YEAR,
        "event_count": int(len(manifest)),
        "frozen_thresholds_from_2016": True,
        "recalibrated_on_2017": False,
        "initial_state": INITIAL_STATE,
        "final_state": int(state),
        "derived_transition_count": int(len(transitions)),
        "trade_episodes": int(len(trades_df)),
        "positive_episode_rate": win_rate,
        "mean_episode_return": mean_trade,
        "median_episode_return": median_trade,
        "mark_to_market_return": final_ret,
        "episode_compound_return": gross_compound,
        "max_drawdown": mdd,
        "active_quote_fraction": active_fraction,
        "always_long_return": always_long,
        "compound_without_best_episode": compound_without_best,
        "warning": "Near-held-out due incidental 2017 FOMC input exposure; no 2017 gold outcomes used in development. Oanda M1 proxies are not final CME execution data.",
    }

    inventory.to_csv(out_dir / "source_inventory.csv", index=False)
    ledger_df.to_csv(out_dir / "event_state_ledger.csv", index=False)
    tactical_df.to_csv(out_dir / "tactical_events.csv", index=False)
    tactical_summary_df.to_csv(out_dir / "tactical_summary.csv", index=False)
    actions_df.to_csv(out_dir / "exposure_actions.csv", index=False)
    trades_df.to_csv(out_dir / "trade_episodes.csv", index=False)
    transitions.to_csv(out_dir / "derived_transitions.csv", index=False)
    q99_challenges.to_csv(out_dir / "q99_challenges.csv", index=False)
    costs_df.to_csv(out_dir / "cost_sensitivity.csv", index=False)
    curve.to_csv(out_dir / "mark_to_market_curve.csv.gz", compression="gzip")
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=2, default=str) + "\n")

    audit = {
        "freeze_source": "TRADABILITY_GATE_V4_2017_HOLDOUT_FREEZE.md",
        "thresholds_q90": TH90,
        "thresholds_q95": TH95,
        "thresholds_q99": TH99,
        "checkpoints": CHECKPOINTS,
        "retention_minutes": RETENTION_MIN,
        "initial_state": INITIAL_STATE,
        "initial_exposure": INITIAL_EXPOSURE,
        "files": {},
    }
    for p in sorted(out_dir.iterdir()):
        if p.is_file():
            audit["files"][p.name] = {"bytes": p.stat().st_size, "sha256": sha256(p)}
    (out_dir / "audit_manifest.json").write_text(json.dumps(audit, indent=2, default=str) + "\n")

    print("GOLD_V4_2017_HOLDOUT_COMPLETE")
    print("\nTRANSITIONS")
    if len(transitions):
        print(transitions[["event_id","event_type","T_align_min","signal_dir","is_q99","retained","classification","state_before","state_after"]].to_string(index=False))
    else:
        print("NONE")
    print("\nTRADE EPISODES")
    print(trades_df.to_string(index=False) if len(trades_df) else "NONE")
    print("\nTACTICAL SUMMARY")
    print(tactical_summary_df.to_string(index=False))
    print("\nCOST SENSITIVITY")
    print(costs_df.to_string(index=False))
    print("\nSUMMARY")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
