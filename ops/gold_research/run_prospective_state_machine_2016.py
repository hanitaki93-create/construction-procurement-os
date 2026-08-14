#!/usr/bin/env python3
"""Prospective 2016 macro-state machine development audit.

IMPORTANT
- Development only. 2016 has been consumed already; this does not establish an edge.
- No hard-coded Jan/May/Jun/Aug state boundaries are used.
- No 2017 data is requested or read.
- q95/q99 materiality gates come from PRIOR same-clock non-event control windows,
  never from future XAU returns.

State logic frozen before this run:
1. q95 alignment is the ordinary actionable/reinforcement threshold.
2. q99 alignment is a rare severe counter-state shock (~1% non-event tail).
3. A state START/one-event REVERSE requires q99 plus 4h retention:
   - gold remains in signal direction from T_align through +4h; and
   - the macro panel is still in the signal direction at event+240m with at least
     q90 materiality.
4. q95 counter-state without that condition is CHALLENGE, never instant reversal.
5. Two retained q95 counter-state observations before any q95 with-state
   reinforcement can also reverse a state (slow-transition fallback).
6. A q99 counter-state shock flattens existing exposure at T_align while retention
   is tested. If it fails, prior-state exposure is restored at event+240m.
7. START/REVERSE exposure begins only after the 4h retention check.

The state brain is therefore slow/persistent while a severe challenge can cause
an intraday risk exit before a confirmed reversal.
"""

from __future__ import annotations

import importlib.util
import json
import math
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

CHECKPOINTS = br.CHECKPOINTS
Q_ACTION = 0.95
Q_SEVERE = 0.99
Q_RETENTION = 0.90
RETENTION_MIN = 240
FORWARD_DIAGNOSTICS = (60, 240, 1440, 4320, 7200)


@dataclass
class Action:
    ts: pd.Timestamp
    exposure: int
    reason: str
    event_id: str
    state_after: int


def load_manifest() -> pd.DataFrame:
    base = pd.read_csv(HERE / "2016_tier_a_event_manifest.csv")
    mins = pd.read_csv(HERE / "2016_tier_a_plus_fomc_minutes_manifest.csv")
    df = pd.concat([base, mins], ignore_index=True)
    df["event_time_utc"] = pd.to_datetime(df["event_time_utc"], utc=True)
    df = df.sort_values("event_time_utc").reset_index(drop=True)
    if len(df) != 52 or df.event_id.duplicated().any() or df.event_time_utc.dt.year.ne(2016).any():
        raise RuntimeError("EVENT_MANIFEST_CONTRACT_FAILED")
    return df


def controls_and_thresholds(manifest: pd.DataFrame, minute: Dict[str, pd.Series]) -> pd.DataFrame:
    event_dates = set(manifest.event_time_utc.dt.normalize())
    rows = []
    for ev in manifest.itertuples(index=False):
        for ctl_t0 in br.prior_control_times(ev.event_time_utc, event_dates):
            for h in CHECKPOINTS:
                r = br.measure_state(ctl_t0, h, minute)
                rows.append(r)
    controls = pd.DataFrame(rows)
    out = []
    for h in CHECKPOINTS:
        vals = controls[
            (controls.checkpoint_min == h) & (controls.majority_direction != 0)
        ].abs_net_transmission_z.replace([np.inf, -np.inf], np.nan).dropna()
        for q in (Q_RETENTION, Q_ACTION, Q_SEVERE):
            out.append(
                {
                    "checkpoint_min": h,
                    "quantile": q,
                    "threshold_abs_net_z": float(vals.quantile(q)) if len(vals) else math.nan,
                    "control_n": int(len(vals)),
                }
            )
    return pd.DataFrame(out)


def first_alignment(
    event_time: pd.Timestamp,
    minute: Dict[str, pd.Series],
    th95: Dict[int, float],
    th99: Dict[int, float],
) -> Optional[dict]:
    for h in CHECKPOINTS:
        r = br.measure_state(event_time, h, minute)
        th = th95[h]
        channel_ok = all(np.isfinite(r[f"{a}_z"]) for a in br.PRIMARY)
        if (
            r["majority_direction"] != 0
            and channel_ok
            and r["abs_net_transmission_z"] >= th
            and r["majority_strength"] > r["opposing_strength"]
        ):
            r = dict(r)
            r["is_q99"] = bool(r["abs_net_transmission_z"] >= th99[h])
            return r
    return None


def retention_check(
    ev_time: pd.Timestamp,
    align: dict,
    minute: Dict[str, pd.Series],
    th90_240: float,
) -> dict:
    direction = int(align["majority_direction"])
    entry_ts = ev_time + pd.Timedelta(minutes=int(align["checkpoint_min"]))
    gold_fwd = br.forward_gold_return(minute["XAU"], entry_ts, RETENTION_MIN)
    gold_retained = np.isfinite(gold_fwd) and direction * gold_fwd > 0

    macro240 = br.measure_state(ev_time, RETENTION_MIN, minute)
    macro_retained = (
        macro240["majority_direction"] == direction
        and macro240["abs_net_transmission_z"] >= th90_240
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


def xau_price(minute: pd.Series, ts: pd.Timestamp) -> float:
    return br.value_at(minute, ts)


def add_action(actions: List[Action], ts: pd.Timestamp, exposure: int, reason: str, event_id: str, state: int) -> None:
    if actions and ts < actions[-1].ts:
        raise RuntimeError("NON_MONOTONIC_ACTION")
    if actions and actions[-1].ts == ts and actions[-1].exposure == exposure:
        return
    actions.append(Action(ts=ts, exposure=exposure, reason=reason, event_id=event_id, state_after=state))


def episode_return(direction: int, p0: float, p1: float) -> float:
    if not (np.isfinite(p0) and p0 > 0 and np.isfinite(p1) and p1 > 0):
        return math.nan
    return direction * (p1 / p0 - 1.0)


def main() -> None:
    data_dir = Path.home() / ".cache/gold_research/oanda_2016"
    out_dir = Path.home() / ".cache/gold_research/prospective_state_machine_2016"
    if "2017" in str(data_dir) or "2017" in str(out_dir):
        raise RuntimeError("PRESERVED_SAMPLE_GUARD")
    out_dir.mkdir(parents=True, exist_ok=True)

    manifest = load_manifest()
    observed, minute = {}, {}
    for alias, instrument in br.INSTRUMENTS.items():
        obs, one = br.load_instrument(data_dir, instrument)
        observed[alias], minute[alias] = obs, one

    thresholds = controls_and_thresholds(manifest, minute)
    th90 = thresholds[thresholds["quantile"] == Q_RETENTION].set_index("checkpoint_min").threshold_abs_net_z.to_dict()
    th95 = thresholds[thresholds["quantile"] == Q_ACTION].set_index("checkpoint_min").threshold_abs_net_z.to_dict()
    th99 = thresholds[thresholds["quantile"] == Q_SEVERE].set_index("checkpoint_min").threshold_abs_net_z.to_dict()

    state = 0
    exposure = 0
    phase = "FLAT"
    retained_counter_count = 0
    flat_candidate_dir = 0
    flat_candidate_count = 0
    actions: List[Action] = []
    ledger = []

    for ev in manifest.itertuples(index=False):
        align = first_alignment(ev.event_time_utc, minute, th95, th99)
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
        retain = retention_check(ev.event_time_utc, align, minute, th90[RETENTION_MIN])
        is_q99 = bool(align["is_q99"])
        rec.update(
            {
                "T_align_min": int(align["checkpoint_min"]),
                "T_align_utc": talign,
                "signal_dir": direction,
                "abs_net_transmission_z": float(align["abs_net_transmission_z"]),
                "is_q99": is_q99,
                **retain,
            }
        )
        for fwd in FORWARD_DIAGNOSTICS:
            raw = br.forward_gold_return(minute["XAU"], talign, fwd)
            rec[f"signal_signed_forward_{fwd}m_pct"] = direction * raw if np.isfinite(raw) else math.nan
            rec[f"state_signed_forward_{fwd}m_pct"] = state * raw if state and np.isfinite(raw) else math.nan

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
            # If a prior severe challenge temporarily flattened exposure, restore immediately on a
            # fresh with-state q95 signal.
            if exposure == 0:
                exposure = state
                add_action(actions, talign, exposure, "RESTORE_ON_REINFORCE", ev.event_id, state)
        else:
            rec["classification"] = "CHALLENGE"
            phase = "CHALLENGED"
            # A severe opposite shock exits risk immediately, but does not reverse yet.
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
                    add_action(
                        actions,
                        reverse_ts,
                        exposure,
                        "REVERSE_Q99_RETAINED" if is_q99 else "REVERSE_2X_Q95_RETAINED",
                        ev.event_id,
                        state,
                    )
                    retained_counter_count = 0
                    rec["classification"] = "REVERSE_Q99_RETAINED" if is_q99 else "REVERSE_2X_Q95_RETAINED"
                else:
                    phase = "REVERSAL_READY"
                    rec["classification"] = "REVERSAL_READY_Q95_RETAINED"
            else:
                retained_counter_count = 0
                # Failed severe challenge: restore old-state exposure only after the 4h failure is known.
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
    actions_df = pd.DataFrame([a.__dict__ for a in actions])

    # Close any open exposure at last observed 2016 XAU quote for development accounting.
    xau_obs = observed["XAU"]
    year_end_ts = xau_obs.index.max()
    if actions and actions[-1].ts < year_end_ts and actions[-1].exposure != 0:
        actions.append(Action(year_end_ts, 0, "YEAR_END_MARK", "YEAR_END", state))
    actions_df = pd.DataFrame([a.__dict__ for a in actions])

    # Episode/trade ledger from exposure changes. Returns are simple 1x spot-direction returns;
    # no execution costs because Oanda archive is a development proxy, not the final vehicle.
    trades = []
    open_ts = None
    open_px = None
    open_dir = 0
    open_reason = None
    open_event = None
    for a in actions:
        px = xau_price(minute["XAU"], a.ts)
        if open_dir != 0 and a.exposure != open_dir:
            ret = episode_return(open_dir, open_px, px)
            trades.append(
                {
                    "entry_ts": open_ts,
                    "exit_ts": a.ts,
                    "direction": open_dir,
                    "entry_price": open_px,
                    "exit_price": px,
                    "simple_return": ret,
                    "entry_reason": open_reason,
                    "entry_event": open_event,
                    "exit_reason": a.reason,
                    "exit_event": a.event_id,
                }
            )
            open_dir = 0
            open_ts = open_px = open_reason = open_event = None
        if a.exposure != 0 and a.exposure != open_dir:
            open_dir = a.exposure
            open_ts = a.ts
            open_px = px
            open_reason = a.reason
            open_event = a.event_id
    trades_df = pd.DataFrame(trades)

    if len(trades_df):
        compounded = float((1.0 + trades_df.simple_return).prod() - 1.0)
        win_rate = float((trades_df.simple_return > 0).mean())
        mean_trade = float(trades_df.simple_return.mean())
    else:
        compounded = win_rate = mean_trade = math.nan

    # Event-transition diagnostic table only for START/REVERSE classifications.
    transitions = ledger_df[ledger_df.classification.isin(["START_Q99_RETAINED", "START_2X_Q95_RETAINED", "REVERSE_Q99_RETAINED", "REVERSE_2X_Q95_RETAINED"])].copy()

    summary = {
        "status": "DEVELOPMENT_ONLY_NOT_VALIDATION",
        "year": 2016,
        "preserved_2017_accessed": False,
        "events": int(len(manifest)),
        "q95_action": Q_ACTION,
        "q99_severe": Q_SEVERE,
        "q90_retention": Q_RETENTION,
        "retention_minutes": RETENTION_MIN,
        "derived_transition_count": int(len(transitions)),
        "trade_episodes": int(len(trades_df)),
        "compounded_1x_proxy_return": compounded,
        "mean_trade_return": mean_trade,
        "win_rate": win_rate,
        "warning": "2016 is development. Oanda CFDs are proxies. No costs. Do not treat as validated P&L.",
    }

    thresholds.to_csv(out_dir / "control_thresholds_q90_q95_q99.csv", index=False)
    ledger_df.to_csv(out_dir / "event_state_ledger.csv", index=False)
    actions_df.to_csv(out_dir / "exposure_actions.csv", index=False)
    trades_df.to_csv(out_dir / "trade_episodes.csv", index=False)
    transitions.to_csv(out_dir / "derived_transitions.csv", index=False)
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=2, default=str) + "\n")

    print("GOLD_PROSPECTIVE_STATE_MACHINE_2016_COMPLETE")
    print("\nTHRESHOLDS")
    print(thresholds.to_string(index=False))
    print("\nDERIVED TRANSITIONS")
    if len(transitions):
        print(transitions[["event_id","event_type","T_align_min","signal_dir","is_q99","retained","classification","state_before","state_after"]].to_string(index=False))
    else:
        print("NONE")
    print("\nEXPOSURE ACTIONS")
    print(actions_df.to_string(index=False) if len(actions_df) else "NONE")
    print("\nTRADE EPISODES")
    print(trades_df.to_string(index=False) if len(trades_df) else "NONE")
    print("\nSUMMARY")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
