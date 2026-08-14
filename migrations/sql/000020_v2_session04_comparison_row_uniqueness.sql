-- Session 04 hardening: RFQ requirement rows are unique by issued line, while supplier-added rows may be many.

ALTER TABLE procurement.bid_comparison_row
  DROP CONSTRAINT IF EXISTS bid_comparison_row_tenant_id_comparison_id_rfq_issue_line_id_key;

CREATE UNIQUE INDEX IF NOT EXISTS bid_comparison_row_rfq_line_unique_idx
  ON procurement.bid_comparison_row (tenant_id, comparison_id, rfq_issue_line_id)
  WHERE rfq_issue_line_id IS NOT NULL;

COMMENT ON INDEX procurement.bid_comparison_row_rfq_line_unique_idx IS
  'One comparison row per issued RFQ requirement line. Supplier-added rows intentionally have NULL rfq_issue_line_id and are not limited by this index.';
