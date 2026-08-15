-- V2 Session 04 exact-head remediation for the B02 C2 subscription authority invariant.
--
-- Historical migration 000004 declared the same-slot current-version exclusion, but
-- full-suite verification on a clean PostgreSQL 18.4 rebuild showed that the final
-- migrated catalog did not reject an overlapping unsuperseded slot assignment.
-- Migration history is append-only, so restore the invariant explicitly here rather
-- than rewriting 000004.

-- Fail closed if an environment has already accumulated ambiguous current authority.
-- Such rows require explicit business reconciliation before this invariant can be
-- restored safely; the migration must not silently choose a winning subscription item.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM platform.tenant_subscription_item_version AS left_version
    JOIN platform.tenant_subscription_item_version AS right_version
      ON right_version.tenant_id = left_version.tenant_id
     AND right_version.item_slot_key = left_version.item_slot_key
     AND right_version.tenant_subscription_item_version_id
       > left_version.tenant_subscription_item_version_id
     AND right_version.superseded_at IS NULL
     AND left_version.superseded_at IS NULL
     AND right_version.effective_period && left_version.effective_period
  ) THEN
    RAISE EXCEPTION
      'cannot restore subscription slot overlap invariant: overlapping current item versions exist';
  END IF;
END
$$;

-- Use a stable, explicit constraint name so the final catalog can be audited directly.
-- Dropping only this remediation-owned name keeps the migration re-runnable in clean
-- rebuild tests without rewriting or depending on the generated name from 000004.
ALTER TABLE platform.tenant_subscription_item_version
  DROP CONSTRAINT IF EXISTS tenant_subscription_item_version_current_slot_overlap_excl;

ALTER TABLE platform.tenant_subscription_item_version
  ADD CONSTRAINT tenant_subscription_item_version_current_slot_overlap_excl
  EXCLUDE USING gist (
    tenant_id WITH =,
    item_slot_key WITH =,
    effective_period WITH &&
  ) WHERE (superseded_at IS NULL);

-- Migration-time catalog proof. Runtime hostile tests separately prove that an actual
-- overlapping insert is rejected with exclusion-violation SQLSTATE 23P01.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint AS constraint_row
    WHERE constraint_row.conrelid = 'platform.tenant_subscription_item_version'::regclass
      AND constraint_row.conname = 'tenant_subscription_item_version_current_slot_overlap_excl'
      AND constraint_row.contype = 'x'
      AND constraint_row.convalidated
  ) THEN
    RAISE EXCEPTION
      'subscription slot overlap exclusion is missing or invalid after remediation';
  END IF;
END
$$;
