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

ROOT = Path(__file__).resolve().parent
WORK = Path(os.environ.get("WORK", ROOT))
DL = WORK / "binance_archives"
DL.mkdir(parents=True, exist_ok=True)

BASE = "https://data.binance.vision/data"
FAMILIES = {
    "usd_m_futures": "futures/um/monthly/klines",
    "spot": "spot/monthly/klines",
}
SYMBOLS = ["ETHUSDT", "BTCUSDT"]
INTERVAL = "5m"
EXPECTED_ROWS = 105120
EXPECTED_FIRST = {
    "ETHUSDT": [1735689600000, 3336.58, 3341.87, 3334.76, 3339.41, 4998.605, 1735689899999],
    "BTCUSDT": [1735689600000, 93548.8, 93690.0, 93514.2, 93648.4, 341.604, 1735689899999],
}
EXPECTED_SOURCE_SHA = {
    "ETHUSDT": "28663337ee738c50fddae9c13ef9038907a14387f4131fd080b95bf834ba608b",
    "BTCUSDT": "8736be7c79a76aa1a4980f1e7b9e0c650d25be03f19f5ffa8d4f4fd48c5bf3f5",
}
EXPECTED_1H_SHA = {
    "ETHUSDT": "c401a0d78eace23bf646c148d7b451a703988972d763fac71c4d4dd87f688249",
    "BTCUSDT": "9820989a9e5fa199cad5ac7bdb26f2aad771ca45950e021b59063d9b94dcf2f6",
}
COLS12 = [
    "openTime", "open", "high", "low", "close", "volume", "closeTime",
    "quoteVolume", "trades", "takerBuyBase", "takerBuyQuote", "ignore",
]
COLS7 = COLS12[:7]


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "eth-candlestick-research-v1/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def archive_url(family: str, symbol: str, month: int) -> str:
    stem = f"{symbol}-{INTERVAL}-2025-{month:02d}.zip"
    return f"{BASE}/{FAMILIES[family]}/{symbol}/{INTERVAL}/{stem}"


def download_verified(family: str, symbol: str, month: int) -> tuple[Path, dict]:
    url = archive_url(family, symbol, month)
    name = url.rsplit("/", 1)[-1]
    path = DL / family / symbol / name
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        data = fetch(url)
        path.write_bytes(data)
    actual = sha256_file(path)
    checksum_text = fetch(url + ".CHECKSUM").decode("utf-8", "replace").strip()
    expected = checksum_text.split()[0].lower()
    if actual.lower() != expected:
        raise RuntimeError(f"CHECKSUM_FAIL {family} {symbol} {month:02d} expected={expected} actual={actual}")
    return path, {"url": url, "sha256": actual, "checksum": expected, "bytes": path.stat().st_size}


def parse_archive(path: Path) -> pd.DataFrame:
    with zipfile.ZipFile(path) as z:
        names = [n for n in z.namelist() if n.lower().endswith(".csv")]
        if len(names) != 1:
            raise RuntimeError(f"ZIP_CSV_COUNT_FAIL {path} names={names}")
        data = z.read(names[0])
    first = data.splitlines()[0].decode("utf-8", "replace").split(",")[0].strip()
    has_header = not first.lstrip("-+").isdigit()
    frame = pd.read_csv(io.BytesIO(data), header=0 if has_header else None)
    if frame.shape[1] < 7:
        raise RuntimeError(f"KLINE_COLUMN_COUNT_FAIL {path} cols={frame.shape[1]}")
    frame = frame.iloc[:, : min(12, frame.shape[1])].copy()
    frame.columns = COLS12[: frame.shape[1]]
    frame = frame[COLS7].copy()
    for c in ["openTime", "closeTime"]:
        frame[c] = pd.to_numeric(frame[c], errors="raise").astype("int64")
        if frame[c].abs().median() > 10**14:
            frame[c] = frame[c] // 1000
    for c in ["open", "high", "low", "close", "volume"]:
        frame[c] = pd.to_numeric(frame[c], errors="raise").astype(float)
    return frame


def first_matches(frame: pd.DataFrame, expected: list[float]) -> bool:
    if frame.empty:
        return False
    r = frame.iloc[0]
    got = [int(r.openTime), float(r.open), float(r.high), float(r.low), float(r.close), float(r.volume), int(r.closeTime)]
    if got[0] != int(expected[0]) or got[6] != int(expected[6]):
        return False
    return bool(np.allclose(np.asarray(got[1:6], float), np.asarray(expected[1:6], float), rtol=0, atol=1e-9))


def compact_number(v: float) -> str:
    s = repr(float(v))
    if s.endswith(".0"):
        s = s[:-2]
    return s


def write_compact_source(frame: pd.DataFrame, path: Path) -> None:
    with path.open("w", encoding="utf-8", newline="") as f:
        f.write(",".join(COLS7) + "\n")
        for r in frame.itertuples(index=False):
            f.write(
                f"{int(r.openTime)},{compact_number(r.open)},{compact_number(r.high)},"
                f"{compact_number(r.low)},{compact_number(r.close)},{compact_number(r.volume)},{int(r.closeTime)}\n"
            )


def derive_review_files(symbol: str, frame: pd.DataFrame) -> dict:
    x = frame[["openTime", "open", "high", "low", "close", "volume"]].copy()
    x["timestamp"] = pd.to_datetime(x.pop("openTime"), unit="ms", utc=True)
    x = x.drop_duplicates("timestamp").sort_values("timestamp").set_index("timestamp")
    x = x[(x.index >= "2025-01-01") & (x.index < "2026-01-01")]
    raw_gz = WORK / f"{symbol}_5m_2025.csv.gz"
    x.reset_index().to_csv(raw_gz, index=False, compression="gzip", float_format="%.10g")
    y = x.resample("1h", label="left", closed="left").agg(
        open=("open", "first"), high=("high", "max"), low=("low", "min"), close=("close", "last"), volume=("volume", "sum")
    ).dropna().reset_index()
    one_h = WORK / f"{symbol}_1h_2025.csv"
    y.to_csv(one_h, index=False, float_format="%.10g")
    return {
        "5m_rows": int(len(x)),
        "1h_rows": int(len(y)),
        "5m_gz_sha256": sha256_file(raw_gz),
        "1h_sha256": sha256_file(one_h),
        "1h_expected_sha256": EXPECTED_1H_SHA[symbol],
        "1h_hash_match": sha256_file(one_h) == EXPECTED_1H_SHA[symbol],
    }


def main() -> None:
    audit = {"status": "STARTED", "families_checked": {}, "archives": [], "symbols": {}}

    candidates = []
    for family in FAMILIES:
        family_ok = True
        details = {}
        for symbol in SYMBOLS:
            try:
                path, meta = download_verified(family, symbol, 1)
                frame = parse_archive(path)
                match = first_matches(frame, EXPECTED_FIRST[symbol])
                details[symbol] = {"first_match": match, **meta}
                family_ok = family_ok and match
            except Exception as exc:
                details[symbol] = {"error": str(exc), "first_match": False}
                family_ok = False
        audit["families_checked"][family] = details
        if family_ok:
            candidates.append(family)

    if len(candidates) != 1:
        audit["status"] = "FAIL_SOURCE_FAMILY_IDENTIFICATION"
        (WORK / "reconstruction_audit.json").write_text(json.dumps(audit, indent=2, sort_keys=True) + "\n")
        raise SystemExit(f"SOURCE_FAMILY_IDENTIFICATION_FAIL candidates={candidates}")

    family = candidates[0]
    audit["selected_family"] = family
    print(f"SOURCE_FAMILY={family}", flush=True)

    for symbol in SYMBOLS:
        monthly = []
        for month in range(1, 13):
            path, meta = download_verified(family, symbol, month)
            frame = parse_archive(path)
            monthly.append(frame)
            audit["archives"].append({"family": family, "symbol": symbol, "month": month, **meta})
        all_rows = pd.concat(monthly, ignore_index=True)
        all_rows = all_rows.drop_duplicates("openTime").sort_values("openTime").reset_index(drop=True)
        all_rows = all_rows[(all_rows.openTime >= 1735689600000) & (all_rows.openTime < 1767225600000)].reset_index(drop=True)
        if len(all_rows) != EXPECTED_ROWS:
            raise SystemExit(f"{symbol}_ROW_COUNT_FAIL got={len(all_rows)} expected={EXPECTED_ROWS}")
        diffs = np.diff(all_rows.openTime.to_numpy(dtype=np.int64))
        if not np.all(diffs == 300000):
            bad = int(np.sum(diffs != 300000))
            raise SystemExit(f"{symbol}_CADENCE_FAIL bad={bad}")
        if not first_matches(all_rows, EXPECTED_FIRST[symbol]):
            raise SystemExit(f"{symbol}_FIRST_ROW_FAIL")
        if int(all_rows.openTime.iloc[-1]) != 1767225300000:
            raise SystemExit(f"{symbol}_LAST_TIME_FAIL {int(all_rows.openTime.iloc[-1])}")

        compact = WORK / f"{symbol}_source_reconstructed.csv"
        write_compact_source(all_rows, compact)
        compact_sha = sha256_file(compact)
        review = derive_review_files(symbol, all_rows)
        audit["symbols"][symbol] = {
            "rows": int(len(all_rows)),
            "first_open_time": int(all_rows.openTime.iloc[0]),
            "last_open_time": int(all_rows.openTime.iloc[-1]),
            "source_reconstructed_sha256": compact_sha,
            "source_expected_sha256": EXPECTED_SOURCE_SHA[symbol],
            "source_hash_match": compact_sha == EXPECTED_SOURCE_SHA[symbol],
            **review,
        }
        if not review["1h_hash_match"]:
            audit["status"] = "FAIL_1H_HASH_MISMATCH"
            (WORK / "reconstruction_audit.json").write_text(json.dumps(audit, indent=2, sort_keys=True) + "\n")
            raise SystemExit(f"{symbol}_1H_HASH_MISMATCH got={review['1h_sha256']} expected={EXPECTED_1H_SHA[symbol]}")

    audit["status"] = "PASS"
    audit["strict_identity_note"] = (
        "Exact stored 1h hashes reproduced from checksum-verified Binance monthly archives. "
        "Source byte hash is reported separately because serialization formatting may differ while numeric candles are identical."
    )
    (WORK / "reconstruction_audit.json").write_text(json.dumps(audit, indent=2, sort_keys=True) + "\n")
    print("BINANCE_2025_RECONSTRUCTION_PASS", flush=True)
    print(json.dumps({s: audit['symbols'][s] for s in SYMBOLS}, sort_keys=True), flush=True)


if __name__ == "__main__":
    main()
