#!/usr/bin/env python3
"""Performance hygiene audit for the already-run 2016 prospective state machine.

No strategy logic changes. Uses cached Oanda XAU development proxy and exposure actions.
Reports mark-to-market drawdown, time in market, always-long benchmark, and fixed
round-trip cost sensitivities. Development only; no 2017 access.
"""
from __future__ import annotations

import importlib.util
import json
import math
from pathlib import Path

import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("base_replay", HERE / "run_oanda_macro_transition_replay_2016.py")
br = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(br)


def max_drawdown(x: pd.Series) -> float:
    peak = x.cummax()
    dd = x / peak - 1.0
    return float(dd.min())


def main() -> None:
    data_dir = Path.home() / ".cache/gold_research/oanda_2016"
    state_dir = Path.home() / ".cache/gold_research/prospective_state_machine_2016"
    out_dir = state_dir / "performance_audit"
    if "2017" in str(data_dir) or "2017" in str(state_dir):
        raise RuntimeError("PRESERVED_SAMPLE_GUARD")
    out_dir.mkdir(parents=True, exist_ok=True)

    obs, _ = br.load_instrument(data_dir, br.INSTRUMENTS["XAU"])
    obs = obs.sort_index()
    actions = pd.read_csv(state_dir / "exposure_actions.csv")
    actions["ts"] = pd.to_datetime(actions["ts"], utc=True)
    actions = actions.sort_values("ts").reset_index(drop=True)

    # Build equity using fixed 1x notional at each exposure entry. During an open
    # episode: equity = entry_equity * (1 + direction * (price/entry_price - 1)).
    equity_rows = []
    equity = 1.0
    current_exp = 0
    entry_equity = equity
    entry_price = math.nan
    action_i = 0
    action_records = actions.to_dict("records")

    for ts, price in obs.items():
        while action_i < len(action_records) and action_records[action_i]["ts"] <= ts:
            a = action_records[action_i]
            # First mark the old position to the action price using current quote.
            if current_exp != 0 and np.isfinite(entry_price):
                equity = entry_equity * (1.0 + current_exp * (float(price) / entry_price - 1.0))
            current_exp = int(a["exposure"])
            entry_equity = equity
            entry_price = float(price) if current_exp != 0 else math.nan
            action_i += 1

        if current_exp != 0 and np.isfinite(entry_price):
            mark = entry_equity * (1.0 + current_exp * (float(price) / entry_price - 1.0))
        else:
            mark = equity
        equity_rows.append((ts, float(price), current_exp, mark))

    curve = pd.DataFrame(equity_rows, columns=["ts","xau","exposure","equity"]).set_index("ts")
    final_equity = float(curve.equity.iloc[-1])
    mdd = max_drawdown(curve.equity)
    active_fraction = float((curve.exposure != 0).mean())

    first_price = float(obs.iloc[0])
    last_price = float(obs.iloc[-1])
    always_long = last_price / first_price - 1.0
    always_short = -(last_price / first_price - 1.0)

    trades = pd.read_csv(state_dir / "trade_episodes.csv")
    gross_compound = float((1.0 + trades.simple_return).prod() - 1.0) if len(trades) else math.nan
    costs = []
    for bps in (2, 5, 10, 20):
        c = bps / 10000.0
        net = float((1.0 + (trades.simple_return - c)).prod() - 1.0) if len(trades) else math.nan
        costs.append({"round_trip_cost_bps_per_episode": bps, "net_compounded_return": net})
    costs_df = pd.DataFrame(costs)

    summary = {
        "status": "DEVELOPMENT_ONLY_NOT_VALIDATION",
        "year": 2016,
        "preserved_2017_accessed": False,
        "mark_to_market_final_return": final_equity - 1.0,
        "episode_compound_return": gross_compound,
        "max_drawdown": mdd,
        "active_quote_fraction": active_fraction,
        "always_long_return": always_long,
        "always_short_return": always_short,
        "trade_episodes": int(len(trades)),
        "warning": "Oanda XAU is a development proxy; no slippage/funding/contract mechanics. Cost rows are sensitivity only.",
    }
    curve.to_csv(out_dir / "mark_to_market_curve.csv.gz", compression="gzip")
    costs_df.to_csv(out_dir / "cost_sensitivity.csv", index=False)
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=2) + "\n")

    print("GOLD_PROSPECTIVE_STATE_PERFORMANCE_AUDIT_2016_COMPLETE")
    print(json.dumps(summary, indent=2))
    print("\nCOST SENSITIVITY")
    print(costs_df.to_string(index=False))


if __name__ == "__main__":
    main()
