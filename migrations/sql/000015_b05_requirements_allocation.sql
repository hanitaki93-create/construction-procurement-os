-- B05 Requirements / Allocation / optional ProcurementPackage
-- Frozen basis: INV-003, INV-015..017 and CC-2 conservation guard.

CREATE SCHEMA IF NOT EXISTS requirements;
GRANT USAGE ON SCHEMA requirements TO cpos_procurement_runtime;

CREATE TABLE IF NOT EXISTS requirements.authorized_requirement_source (
  authorized_requirement_source_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  source_kind text NOT NULL CHECK (source_kind IN ('BOQ','SCHEDULE','DRAWING','SPECIFICATION','MANUAL_AUTHORIZED_REQUIREMENT')),
  source_reference text NOT NULL CHECK (length(source_reference) BETWEEN 1 AND 500),
  evidence_version_id uuid,
  created_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id) REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, evidence_version_id) REFERENCES evidence.evidence_version(tenant_id, evidence_version_id),
  FOREIGN KEY (tenant_id, created_by_principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, authorized_requirement_source_id)
);

CREATE TABLE IF NOT EXISTS requirements.authorized_requirement_basis_version (
  authorized_requirement_basis_version_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  authorized_requirement_source_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  description text NOT NULL CHECK (length(description) BETWEEN 1 AND 1000),
  authorized_quantity numeric(38,12) NOT NULL CHECK (authorized_quantity >= 0),
  uom_key text NOT NULL CHECK (uom_key ~ '^[A-Z][A-Z0-9_]{0,31}$'),
  basis_evidence_version_id uuid,
  amendment_reason text,
  supersedes_basis_version_id uuid,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, authorized_requirement_source_id)
    REFERENCES requirements.authorized_requirement_source(tenant_id, authorized_requirement_source_id),
  FOREIGN KEY (tenant_id, basis_evidence_version_id)
    REFERENCES evidence.evidence_version(tenant_id, evidence_version_id),
  FOREIGN KEY (supersedes_basis_version_id)
    REFERENCES requirements.authorized_requirement_basis_version(authorized_requirement_basis_version_id),
  UNIQUE (authorized_requirement_source_id, version),
  UNIQUE (tenant_id, authorized_requirement_basis_version_id)
);

CREATE TABLE IF NOT EXISTS requirements.authorized_requirement_basis_guard (
  tenant_id uuid NOT NULL,
  authorized_requirement_source_id uuid NOT NULL,
  current_basis_version_id uuid NOT NULL,
  current_authorized_quantity numeric(38,12) NOT NULL CHECK (current_authorized_quantity >= 0),
  uom_key text NOT NULL,
  guard_version bigint NOT NULL CHECK (guard_version > 0),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (tenant_id, authorized_requirement_source_id),
  FOREIGN KEY (tenant_id, authorized_requirement_source_id)
    REFERENCES requirements.authorized_requirement_source(tenant_id, authorized_requirement_source_id),
  FOREIGN KEY (tenant_id, current_basis_version_id)
    REFERENCES requirements.authorized_requirement_basis_version(tenant_id, authorized_requirement_basis_version_id)
);

CREATE TABLE IF NOT EXISTS requirements.requirement_allocation (
  requirement_allocation_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  authorized_requirement_source_id uuid NOT NULL,
  parent_allocation_id uuid,
  quantity numeric(38,12) NOT NULL CHECK (quantity > 0),
  uom_key text NOT NULL CHECK (uom_key ~ '^[A-Z][A-Z0-9_]{0,31}$'),
  allocation_purpose text NOT NULL CHECK (length(allocation_purpose) BETWEEN 1 AND 500),
  created_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, authorized_requirement_source_id)
    REFERENCES requirements.authorized_requirement_source(tenant_id, authorized_requirement_source_id),
  FOREIGN KEY (parent_allocation_id) REFERENCES requirements.requirement_allocation(requirement_allocation_id),
  FOREIGN KEY (tenant_id, created_by_principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, requirement_allocation_id)
);

CREATE TABLE IF NOT EXISTS requirements.requirement_allocation_occurrence (
  requirement_allocation_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  requirement_allocation_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN ('ALLOCATED','RELEASED','SUPERSEDED')),
  reason text,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, requirement_allocation_id)
    REFERENCES requirements.requirement_allocation(tenant_id, requirement_allocation_id),
  UNIQUE (requirement_allocation_id, sequence),
  UNIQUE (tenant_id, requirement_allocation_occurrence_id)
);

CREATE TABLE IF NOT EXISTS requirements.procurement_package (
  procurement_package_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  package_code text NOT NULL CHECK (length(package_code) BETWEEN 1 AND 64),
  display_name text NOT NULL CHECK (length(display_name) BETWEEN 1 AND 240),
  created_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id) REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, created_by_principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, project_id, package_code),
  UNIQUE (tenant_id, procurement_package_id)
);

CREATE TABLE IF NOT EXISTS requirements.package_membership_occurrence (
  package_membership_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  procurement_package_id uuid NOT NULL,
  requirement_allocation_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN ('ADDED','REMOVED')),
  reason text,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, procurement_package_id)
    REFERENCES requirements.procurement_package(tenant_id, procurement_package_id),
  FOREIGN KEY (tenant_id, requirement_allocation_id)
    REFERENCES requirements.requirement_allocation(tenant_id, requirement_allocation_id),
  UNIQUE (procurement_package_id, requirement_allocation_id, sequence),
  UNIQUE (tenant_id, package_membership_occurrence_id)
);

CREATE OR REPLACE FUNCTION requirements.reject_rewrite()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog, requirements AS $$ BEGIN RAISE EXCEPTION '% is append-only', TG_TABLE_NAME; END $$;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['authorized_requirement_source','authorized_requirement_basis_version','requirement_allocation','requirement_allocation_occurrence','procurement_package','package_membership_occurrence'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS reject_rewrite ON requirements.%I',t);
    EXECUTE format('CREATE TRIGGER reject_rewrite BEFORE UPDATE OR DELETE ON requirements.%I FOR EACH ROW EXECUTE FUNCTION requirements.reject_rewrite()',t);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION requirements.command_context_valid(p_project_id uuid)
RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=pg_catalog,requirements,platform AS $$
DECLARE v_tenant uuid; BEGIN
  BEGIN v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; EXCEPTION WHEN invalid_text_representation THEN RETURN false; END;
  RETURN v_tenant IS NOT NULL AND platform.current_tenant_has_active_product_access()
    AND (platform.current_principal_has_active_tenant_role('OWNER') OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER'))
    AND EXISTS(SELECT 1 FROM platform.project p JOIN platform.project_version pv ON pv.tenant_id=p.tenant_id AND pv.project_id=p.project_id
      WHERE p.tenant_id=v_tenant AND p.project_id=p_project_id AND pv.lifecycle_state='ACTIVE' AND pv.effective_period @> statement_timestamp());
END $$;

CREATE OR REPLACE FUNCTION requirements.create_authorized_requirement(
  p_source_id uuid,p_basis_version_id uuid,p_project_id uuid,p_authority_context_id uuid,p_source_kind text,p_reference text,
  p_description text,p_quantity numeric,p_uom_key text,p_evidence_version_id uuid
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,requirements,evidence,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  IF NOT requirements.command_context_valid(p_project_id) THEN RAISE EXCEPTION 'requirement command context is not authorized'; END IF;
  IF NOT EXISTS(SELECT 1 FROM platform.project WHERE tenant_id=v_tenant AND project_id=p_project_id AND authority_context_id=p_authority_context_id) THEN RAISE EXCEPTION 'project authority context mismatch'; END IF;
  IF p_evidence_version_id IS NOT NULL AND NOT EXISTS(SELECT 1 FROM evidence.evidence_version WHERE tenant_id=v_tenant AND evidence_version_id=p_evidence_version_id) THEN RAISE EXCEPTION 'requirement evidence version unavailable'; END IF;
  INSERT INTO requirements.authorized_requirement_source(authorized_requirement_source_id,tenant_id,project_id,authority_context_id,source_kind,source_reference,evidence_version_id,created_by_principal_id)
    VALUES(p_source_id,v_tenant,p_project_id,p_authority_context_id,p_source_kind,p_reference,p_evidence_version_id,v_principal);
  INSERT INTO requirements.authorized_requirement_basis_version(authorized_requirement_basis_version_id,tenant_id,authorized_requirement_source_id,version,description,authorized_quantity,uom_key,basis_evidence_version_id)
    VALUES(p_basis_version_id,v_tenant,p_source_id,1,p_description,p_quantity,p_uom_key,p_evidence_version_id);
  INSERT INTO requirements.authorized_requirement_basis_guard(tenant_id,authorized_requirement_source_id,current_basis_version_id,current_authorized_quantity,uom_key,guard_version)
    VALUES(v_tenant,p_source_id,p_basis_version_id,p_quantity,p_uom_key,1);
  RETURN p_source_id;
END $$;

CREATE OR REPLACE FUNCTION requirements.amend_authorized_requirement(
  p_new_basis_version_id uuid,p_source_id uuid,p_description text,p_quantity numeric,p_evidence_version_id uuid,p_reason text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,requirements,evidence,platform AS $$
DECLARE v_tenant uuid; v_project uuid; v_guard requirements.authorized_requirement_basis_guard%ROWTYPE; v_allocated numeric; v_new_version bigint; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT project_id INTO v_project FROM requirements.authorized_requirement_source WHERE tenant_id=v_tenant AND authorized_requirement_source_id=p_source_id;
  IF v_project IS NULL OR NOT requirements.command_context_valid(v_project) THEN RAISE EXCEPTION 'requirement source unavailable or unauthorized'; END IF;
  SELECT * INTO v_guard FROM requirements.authorized_requirement_basis_guard WHERE tenant_id=v_tenant AND authorized_requirement_source_id=p_source_id FOR UPDATE;
  SELECT coalesce(sum(a.quantity),0) INTO v_allocated
  FROM requirements.requirement_allocation a
  JOIN LATERAL (SELECT o.occurrence_kind FROM requirements.requirement_allocation_occurrence o WHERE o.requirement_allocation_id=a.requirement_allocation_id ORDER BY o.sequence DESC LIMIT 1) state ON true
  WHERE a.tenant_id=v_tenant AND a.authorized_requirement_source_id=p_source_id AND state.occurrence_kind='ALLOCATED';
  IF p_quantity < v_allocated THEN RAISE EXCEPTION 'authorized quantity cannot be amended below active allocation'; END IF;
  SELECT coalesce(max(version),0)+1 INTO v_new_version FROM requirements.authorized_requirement_basis_version WHERE authorized_requirement_source_id=p_source_id;
  INSERT INTO requirements.authorized_requirement_basis_version(authorized_requirement_basis_version_id,tenant_id,authorized_requirement_source_id,version,description,authorized_quantity,uom_key,basis_evidence_version_id,amendment_reason,supersedes_basis_version_id)
    VALUES(p_new_basis_version_id,v_tenant,p_source_id,v_new_version,p_description,p_quantity,v_guard.uom_key,p_evidence_version_id,p_reason,v_guard.current_basis_version_id);
  UPDATE requirements.authorized_requirement_basis_guard SET current_basis_version_id=p_new_basis_version_id,current_authorized_quantity=p_quantity,guard_version=guard_version+1,updated_at=clock_timestamp()
    WHERE tenant_id=v_tenant AND authorized_requirement_source_id=p_source_id;
  RETURN p_new_basis_version_id;
END $$;

CREATE OR REPLACE FUNCTION requirements.allocate_requirement(
  p_allocation_id uuid,p_source_id uuid,p_quantity numeric,p_uom_key text,p_purpose text,p_parent_allocation_id uuid DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,requirements,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; v_project uuid; v_guard requirements.authorized_requirement_basis_guard%ROWTYPE; v_allocated numeric; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  SELECT project_id INTO v_project FROM requirements.authorized_requirement_source WHERE tenant_id=v_tenant AND authorized_requirement_source_id=p_source_id;
  IF v_project IS NULL OR NOT requirements.command_context_valid(v_project) THEN RAISE EXCEPTION 'requirement source unavailable or unauthorized'; END IF;
  SELECT * INTO v_guard FROM requirements.authorized_requirement_basis_guard WHERE tenant_id=v_tenant AND authorized_requirement_source_id=p_source_id FOR UPDATE;
  IF p_uom_key<>v_guard.uom_key THEN RAISE EXCEPTION 'allocation UOM does not match authorized basis'; END IF;
  IF p_parent_allocation_id IS NOT NULL THEN
    IF NOT EXISTS(SELECT 1 FROM requirements.requirement_allocation p JOIN LATERAL(SELECT occurrence_kind FROM requirements.requirement_allocation_occurrence o WHERE o.requirement_allocation_id=p.requirement_allocation_id ORDER BY sequence DESC LIMIT 1)s ON true
      WHERE p.tenant_id=v_tenant AND p.requirement_allocation_id=p_parent_allocation_id AND p.authorized_requirement_source_id=p_source_id AND s.occurrence_kind IN ('RELEASED','SUPERSEDED')) THEN
      RAISE EXCEPTION 'child allocation requires released/superseded parent lineage';
    END IF;
  END IF;
  SELECT coalesce(sum(a.quantity),0) INTO v_allocated FROM requirements.requirement_allocation a
  JOIN LATERAL(SELECT occurrence_kind FROM requirements.requirement_allocation_occurrence o WHERE o.requirement_allocation_id=a.requirement_allocation_id ORDER BY sequence DESC LIMIT 1)s ON true
  WHERE a.tenant_id=v_tenant AND a.authorized_requirement_source_id=p_source_id AND s.occurrence_kind='ALLOCATED';
  IF v_allocated + p_quantity > v_guard.current_authorized_quantity THEN RAISE EXCEPTION 'requirement allocation exceeds current authorized quantity'; END IF;
  INSERT INTO requirements.requirement_allocation(requirement_allocation_id,tenant_id,authorized_requirement_source_id,parent_allocation_id,quantity,uom_key,allocation_purpose,created_by_principal_id)
    VALUES(p_allocation_id,v_tenant,p_source_id,p_parent_allocation_id,p_quantity,p_uom_key,p_purpose,v_principal);
  INSERT INTO requirements.requirement_allocation_occurrence(requirement_allocation_occurrence_id,tenant_id,requirement_allocation_id,sequence,occurrence_kind)
    VALUES(gen_random_uuid(),v_tenant,p_allocation_id,1,'ALLOCATED');
  RETURN p_allocation_id;
END $$;

CREATE OR REPLACE FUNCTION requirements.release_allocation(p_allocation_id uuid,p_reason text)
RETURNS bigint LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,requirements,platform AS $$
DECLARE v_tenant uuid; v_source uuid; v_project uuid; v_seq bigint; v_state text; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT authorized_requirement_source_id INTO v_source FROM requirements.requirement_allocation WHERE tenant_id=v_tenant AND requirement_allocation_id=p_allocation_id;
  SELECT project_id INTO v_project FROM requirements.authorized_requirement_source WHERE tenant_id=v_tenant AND authorized_requirement_source_id=v_source;
  IF v_project IS NULL OR NOT requirements.command_context_valid(v_project) THEN RAISE EXCEPTION 'allocation unavailable or unauthorized'; END IF;
  PERFORM 1 FROM requirements.authorized_requirement_basis_guard WHERE tenant_id=v_tenant AND authorized_requirement_source_id=v_source FOR UPDATE;
  SELECT sequence,occurrence_kind INTO v_seq,v_state FROM requirements.requirement_allocation_occurrence WHERE requirement_allocation_id=p_allocation_id ORDER BY sequence DESC LIMIT 1 FOR UPDATE;
  IF v_state<>'ALLOCATED' THEN RAISE EXCEPTION 'only active allocation may be released'; END IF;
  v_seq:=v_seq+1;
  INSERT INTO requirements.requirement_allocation_occurrence(requirement_allocation_occurrence_id,tenant_id,requirement_allocation_id,sequence,occurrence_kind,reason)
    VALUES(gen_random_uuid(),v_tenant,p_allocation_id,v_seq,'RELEASED',p_reason);
  RETURN v_seq;
END $$;

CREATE OR REPLACE FUNCTION requirements.create_procurement_package(p_package_id uuid,p_project_id uuid,p_authority_context_id uuid,p_code text,p_name text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,requirements,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  IF NOT requirements.command_context_valid(p_project_id) THEN RAISE EXCEPTION 'package command context unauthorized'; END IF;
  INSERT INTO requirements.procurement_package(procurement_package_id,tenant_id,project_id,authority_context_id,package_code,display_name,created_by_principal_id)
    VALUES(p_package_id,v_tenant,p_project_id,p_authority_context_id,p_code,p_name,v_principal);
  RETURN p_package_id;
END $$;

CREATE OR REPLACE FUNCTION requirements.record_package_membership(p_occurrence_id uuid,p_package_id uuid,p_allocation_id uuid,p_kind text,p_reason text DEFAULT NULL)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,requirements,platform AS $$
DECLARE v_tenant uuid; v_project uuid; v_source_project uuid; v_seq bigint; v_current text; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT project_id INTO v_project FROM requirements.procurement_package WHERE tenant_id=v_tenant AND procurement_package_id=p_package_id;
  SELECT s.project_id INTO v_source_project FROM requirements.requirement_allocation a JOIN requirements.authorized_requirement_source s ON s.tenant_id=a.tenant_id AND s.authorized_requirement_source_id=a.authorized_requirement_source_id
    WHERE a.tenant_id=v_tenant AND a.requirement_allocation_id=p_allocation_id;
  IF v_project IS NULL OR v_source_project IS DISTINCT FROM v_project OR NOT requirements.command_context_valid(v_project) THEN RAISE EXCEPTION 'package/allocation project mismatch or unauthorized'; END IF;
  SELECT sequence,occurrence_kind INTO v_seq,v_current FROM requirements.package_membership_occurrence
    WHERE procurement_package_id=p_package_id AND requirement_allocation_id=p_allocation_id ORDER BY sequence DESC LIMIT 1 FOR UPDATE;
  IF p_kind='ADDED' AND v_current='ADDED' THEN RAISE EXCEPTION 'allocation already belongs to package'; END IF;
  IF p_kind='REMOVED' AND v_current IS DISTINCT FROM 'ADDED' THEN RAISE EXCEPTION 'allocation is not active in package'; END IF;
  v_seq:=coalesce(v_seq,0)+1;
  INSERT INTO requirements.package_membership_occurrence(package_membership_occurrence_id,tenant_id,procurement_package_id,requirement_allocation_id,sequence,occurrence_kind,reason)
    VALUES(p_occurrence_id,v_tenant,p_package_id,p_allocation_id,v_seq,p_kind,p_reason);
  RETURN p_occurrence_id;
END $$;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['authorized_requirement_source','authorized_requirement_basis_version','authorized_requirement_basis_guard','requirement_allocation','requirement_allocation_occurrence','procurement_package','package_membership_occurrence'] LOOP
    EXECUTE format('ALTER TABLE requirements.%I ENABLE ROW LEVEL SECURITY',t);
    EXECUTE format('ALTER TABLE requirements.%I FORCE ROW LEVEL SECURITY',t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON requirements.%I',t);
    EXECUTE format('CREATE POLICY tenant_select ON requirements.%I FOR SELECT TO cpos_procurement_runtime USING (tenant_id::text=nullif(current_setting(''cpos.tenant_id'',true),''''))',t);
    EXECUTE format('GRANT SELECT ON requirements.%I TO cpos_procurement_runtime',t);
  END LOOP;
END $$;

REVOKE ALL ON ALL TABLES IN SCHEMA requirements FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA requirements FROM PUBLIC;
GRANT EXECUTE ON FUNCTION requirements.create_authorized_requirement(uuid,uuid,uuid,uuid,text,text,text,numeric,text,uuid) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION requirements.amend_authorized_requirement(uuid,uuid,text,numeric,uuid,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION requirements.allocate_requirement(uuid,uuid,numeric,text,text,uuid) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION requirements.release_allocation(uuid,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION requirements.create_procurement_package(uuid,uuid,uuid,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION requirements.record_package_membership(uuid,uuid,uuid,text,text) TO cpos_procurement_runtime;
