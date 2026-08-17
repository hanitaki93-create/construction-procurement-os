from pathlib import Path


def replace(path: str, old: str, new: str, count: int = 1) -> None:
    p = Path(path)
    text = p.read_text()
    found = text.count(old)
    if found < count:
        raise SystemExit(f"{path}: expected at least {count} copies, found {found}: {old[:120]!r}")
    p.write_text(text.replace(old, new, count))


# Prefer the common construction default EA instead of whatever UOM sorts first.
path = "apps/web-internal/src/erp-requisition-s03.tsx"
old = "refs.uoms[0]?.code ?? 'EA'"
new = "refs.uoms.find((uom) => uom.code === 'EA')?.code ?? refs.uoms[0]?.code ?? 'EA'"
p = Path(path)
text = p.read_text()
if text.count(old) != 2:
    raise SystemExit(f"expected exactly 2 default-UOM occurrences, found {text.count(old)}")
p.write_text(text.replace(old, new))

# The review fixture may legitimately have progressed from SUBMITTED to APPROVED.
# The invariant is: any non-DRAFT state rejects silent demand editing and preserves the original 8 lines.
replace(
    ".github/workflows/erp-slice-03-preview.yml",
    "          docker exec cpos-v2-preview-db psql -U postgres -d cpos -Atc \\\n            \"SELECT subject || '|' || status || '|' || (SELECT count(*) FROM procurement.material_requisition_line l WHERE l.mr_id=m.mr_id) FROM procurement.material_requisition m WHERE m.mr_id='019f1500-0000-7000-8000-000000000102';\" \\\n            | grep -q '^Site timber, tools & fixing materials — 8-line request|SUBMITTED|8$'",
    "          docker exec cpos-v2-preview-db psql -U postgres -d cpos -Atc \\\n            \"SELECT CASE WHEN subject='Site timber, tools & fixing materials — 8-line request' AND status <> 'DRAFT' AND (SELECT count(*) FROM procurement.material_requisition_line l WHERE l.mr_id=m.mr_id)=8 THEN 'MR_LOCK_INVARIANT_OK' ELSE subject || '|' || status || '|' || (SELECT count(*) FROM procurement.material_requisition_line l WHERE l.mr_id=m.mr_id) END FROM procurement.material_requisition m WHERE m.mr_id='019f1500-0000-7000-8000-000000000102';\" \\\n            | grep -q '^MR_LOCK_INVARIANT_OK$'",
)
