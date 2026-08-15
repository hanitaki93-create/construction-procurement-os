import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';

import type {
  AddComparisonAdjustmentRequest,
  BidComparisonDetail,
  BidComparisonDetailResponse,
  BidComparisonRegisterResponse,
  ComparisonBidder,
  ComparisonCell,
  ComparisonCoverageStatus,
  ComparisonRow,
  CreateBidComparisonResponse,
  FreezeBidComparisonResponse,
  UpsertComparisonCellRequest,
} from '@cpos/contracts/procurement-comparison';
import type {
  SupplierQuotationDetailResponse,
  SupplierQuotationLine,
  SupplierResponseRegisterResponse,
  SupplierResponseRegisterRow,
} from '@cpos/contracts/procurement-responses';
import type { SupportedLocale } from '@cpos/ui-foundation';

import { ConfirmedBasisEditor } from './comparison-confirmed-basis.js';
import './comparison.css';

interface Session {
  readonly tenantId: string;
  readonly principalId: string;
}

function headers(session: Session): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function json<T>(url: string, session: Session, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { ...headers(session), ...(init?.headers ?? {}) } });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { readonly code?: string; readonly message?: string };
      message = body.message ?? body.code ?? message;
    } catch {
      // HTTP fallback stays visible.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

function money(value: string | null, currency: string): string {
  if (value === null) return '—';
  return `${currency} ${value}`;
}

function issueKey(row: SupplierResponseRegisterRow): string {
  return row.rfqIssueId;
}

function ComparisonCreate({
  session,
  responses,
  onCreated,
}: {
  readonly session: Session;
  readonly responses: readonly SupplierResponseRegisterRow[];
  readonly onCreated: (comparisonId: string) => void;
}) {
  const client = useQueryClient();
  const issues = useMemo(() => {
    const map = new Map<string, SupplierResponseRegisterRow>();
    for (const row of responses) if (row.latestQuotationRevisionId !== null && row.responseStatus !== 'WITHDRAWN') map.set(issueKey(row), row);
    return [...map.values()];
  }, [responses]);
  const [issueId, setIssueId] = useState(issues[0]?.rfqIssueId ?? '');
  const [title, setTitle] = useState('Commercial bid comparison');
  const [baseCurrency, setBaseCurrency] = useState('AED');
  const eligible = responses.filter((row) => row.rfqIssueId === issueId && row.latestQuotationRevisionId !== null && row.responseStatus !== 'WITHDRAWN');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const create = useMutation({
    mutationFn: () => json<CreateBidComparisonResponse>('/procurement/comparisons', session, {
      method: 'POST',
      body: JSON.stringify({
        rfqIssueId: issueId,
        title,
        baseCurrency: baseCurrency.toUpperCase(),
        bidders: eligible
          .filter((row) => selected.includes(row.rfqIssueBidderId))
          .map((row) => ({ rfqIssueBidderId: row.rfqIssueBidderId, selectedQuotationRevisionId: row.latestQuotationRevisionId })),
      }),
    }),
    onSuccess: async (data) => {
      await client.invalidateQueries({ queryKey: ['bid-comparisons', session] });
      onCreated(data.comparison.comparisonId);
    },
  });

  function toggle(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="comparison-create panel" onSubmit={submit}>
      <div className="panel-heading"><div><p className="panel-kicker">New leveling basis</p><h3>Create bid comparison</h3><p>Select the immutable quotation revisions that will be leveled. Supplier source values stay untouched.</p></div></div>
      <div className="comparison-form-grid">
        <label><span>Issued RFQ / Tender</span><select value={issueId} onChange={(event) => { setIssueId(event.target.value); setSelected([]); }} required><option value="">Select issued event</option>{issues.map((row) => <option key={row.rfqIssueId} value={row.rfqIssueId}>{row.rfqNumber} — {row.rfqTitle}</option>)}</select></label>
        <label><span>Comparison title</span><input value={title} onChange={(event) => setTitle(event.target.value)} required /></label>
        <label><span>Base currency</span><input value={baseCurrency} onChange={(event) => setBaseCurrency(event.target.value.toUpperCase())} maxLength={3} required /></label>
      </div>
      <div className="comparison-bidder-picker">
        {eligible.length === 0 ? <p className="comparison-empty">No structured quotation revisions are available for this issued event.</p> : eligible.map((row) => (
          <label key={row.rfqIssueBidderId} className={`comparison-bidder-option${selected.includes(row.rfqIssueBidderId) ? ' comparison-bidder-option--selected' : ''}`}>
            <input type="checkbox" checked={selected.includes(row.rfqIssueBidderId)} onChange={() => toggle(row.rfqIssueBidderId)} />
            <span><strong>{row.supplierCode} · {row.supplierLegalName}</strong><small>R{row.latestRevisionNo} · {row.currency ?? '—'}{row.isLate ? ' · LATE' : ''}</small></span>
          </label>
        ))}
      </div>
      {create.isError ? <p className="form-error">{create.error.message}</p> : null}
      <div className="form-actions"><button className="primary-button" type="submit" disabled={create.isPending || selected.length === 0}>{create.isPending ? 'Creating…' : 'Create comparison'}</button></div>
    </form>
  );
}

function CellEditor({
  session,
  comparison,
  row,
  bidder,
  quotationLines,
}: {
  readonly session: Session;
  readonly comparison: BidComparisonDetail;
  readonly row: ComparisonRow;
  readonly bidder: ComparisonBidder;
  readonly quotationLines: readonly SupplierQuotationLine[];
}) {
  const client = useQueryClient();
  const existing = row.cells.find((item) => item.comparisonBidderId === bidder.comparisonBidderId);
  const [coverageStatus, setCoverageStatus] = useState<ComparisonCoverageStatus>(existing?.coverageStatus ?? 'UNRESOLVED');
  const [sourceQuotationLineId, setSourceQuotationLineId] = useState(existing?.source?.quotationLineId ?? '');
  const [normalizedQuantity, setNormalizedQuantity] = useState(existing?.normalizedQuantity ?? '');
  const [normalizedUomCode, setNormalizedUomCode] = useState(existing?.normalizedUomCode ?? '');
  const [normalizedUnitRate, setNormalizedUnitRate] = useState(existing?.normalizedUnitRate ?? '');
  const [normalizedAmount, setNormalizedAmount] = useState(existing?.normalizedAmount ?? '');
  const [normalizationBasis, setNormalizationBasis] = useState(existing?.normalizationBasis ?? '');
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');

  const save = useMutation({
    mutationFn: () => {
      const request: UpsertComparisonCellRequest = {
        coverageStatus,
        ...(sourceQuotationLineId ? { sourceQuotationLineId } : {}),
        ...(normalizedQuantity ? { normalizedQuantity } : {}),
        ...(normalizedUomCode ? { normalizedUomCode } : {}),
        ...(normalizedUnitRate ? { normalizedUnitRate } : {}),
        ...(normalizedAmount ? { normalizedAmount } : {}),
        ...(normalizationBasis ? { normalizationBasis } : {}),
      };
      return json<BidComparisonDetailResponse>(`/procurement/comparisons/${comparison.comparisonId}/rows/${row.comparisonRowId}/bidders/${bidder.comparisonBidderId}/cell`, session, { method: 'PUT', body: JSON.stringify(request) });
    },
    onSuccess: async () => client.invalidateQueries({ queryKey: ['bid-comparison', session, comparison.comparisonId] }),
  });

  const adjust = useMutation({
    mutationFn: () => {
      if (!existing) throw new Error('Save the comparison cell before adding an adjustment');
      const request: AddComparisonAdjustmentRequest = { adjustmentType: Number(adjustmentAmount) < 0 ? 'DEDUCT_COST' : 'ADD_COST', adjustmentAmount, reason: adjustmentReason };
      return json<BidComparisonDetailResponse>(`/procurement/comparisons/${comparison.comparisonId}/cells/${existing.comparisonCellId}/adjustments`, session, { method: 'POST', body: JSON.stringify(request) });
    },
    onSuccess: async () => {
      setAdjustmentAmount(''); setAdjustmentReason('');
      await client.invalidateQueries({ queryKey: ['bid-comparison', session, comparison.comparisonId] });
    },
  });

  const selectedSource = quotationLines.find((line) => line.quotationLineId === sourceQuotationLineId) ?? existing?.source ?? null;

  return (
    <div className={`level-cell level-cell--${coverageStatus.toLowerCase().replaceAll('_', '-')}`}>
      <div className="level-source">
        <span className="layer-label">Supplier source</span>
        <select value={coverageStatus} disabled={comparison.state === 'FROZEN'} onChange={(event) => setCoverageStatus(event.target.value as ComparisonCoverageStatus)}>
          {['UNRESOLVED','EXACT','PARTIAL','BUNDLED','ALTERNATE','SUPPLIER_ADDED','MISSING','NOT_APPLICABLE'].map((value) => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}
        </select>
        <select value={sourceQuotationLineId} disabled={comparison.state === 'FROZEN' || coverageStatus === 'MISSING' || coverageStatus === 'NOT_APPLICABLE'} onChange={(event) => setSourceQuotationLineId(event.target.value)}>
          <option value="">No mapped source line</option>
          {quotationLines.map((line) => <option key={line.quotationLineId} value={line.quotationLineId}>{line.supplierLineNo ?? '—'} · {line.supplierDescription.slice(0, 56)}</option>)}
        </select>
        {selectedSource ? <div className="source-truth"><strong>{selectedSource.supplierDescription}</strong><span>{selectedSource.quotedQuantity ?? '—'} {selectedSource.quotedUomCode ?? ''} @ {selectedSource.unitRate ?? '—'}</span><span>Source amount: {selectedSource.lineAmount ?? '—'}</span></div> : <span className="source-truth source-truth--empty">No supplier source mapped.</span>}
      </div>
      <div className="level-normalized">
        <span className="layer-label">Buyer normalization</span>
        <div className="level-mini-grid"><input placeholder="Qty" value={normalizedQuantity} disabled={comparison.state === 'FROZEN'} onChange={(event) => setNormalizedQuantity(event.target.value)} /><input placeholder="UOM" value={normalizedUomCode} disabled={comparison.state === 'FROZEN'} onChange={(event) => setNormalizedUomCode(event.target.value)} /><input placeholder="Unit rate" value={normalizedUnitRate} disabled={comparison.state === 'FROZEN'} onChange={(event) => setNormalizedUnitRate(event.target.value)} /><input placeholder="Amount" value={normalizedAmount} disabled={comparison.state === 'FROZEN'} onChange={(event) => setNormalizedAmount(event.target.value)} /></div>
        <textarea placeholder="Normalization basis — required when normalized values are used" value={normalizationBasis} disabled={comparison.state === 'FROZEN'} onChange={(event) => setNormalizationBasis(event.target.value)} />
        {comparison.state === 'DRAFT' ? <button className="secondary-button secondary-button--compact" type="button" onClick={() => save.mutate()} disabled={save.isPending}>Save leveling</button> : null}
      </div>
      <div className="level-adjustments">
        <span className="layer-label">Buyer adjustments</span>
        {(existing?.adjustments ?? []).map((item) => <span className="adjustment-line" key={item.comparisonAdjustmentId}>{item.adjustmentType.replaceAll('_', ' ')} {item.adjustmentAmount} · {item.reason}</span>)}
        {comparison.state === 'DRAFT' && existing ? <><div className="level-mini-grid"><input placeholder="± amount" value={adjustmentAmount} onChange={(event) => setAdjustmentAmount(event.target.value)} /><input placeholder="Reason" value={adjustmentReason} onChange={(event) => setAdjustmentReason(event.target.value)} /></div><button className="secondary-button secondary-button--compact" type="button" disabled={!adjustmentAmount || !adjustmentReason || adjust.isPending} onClick={() => adjust.mutate()}>Add adjustment</button></> : null}
        <strong className="evaluated-total">Evaluated: {money(existing?.evaluatedAmount ?? null, comparison.baseCurrency)}</strong>
      </div>
      <ConfirmedBasisEditor session={session} comparison={comparison} row={row} bidder={bidder} cell={existing} source={selectedSource} />
      {save.isError ? <small className="form-error">{save.error.message}</small> : null}
      {adjust.isError ? <small className="form-error">{adjust.error.message}</small> : null}
    </div>
  );
}

function ComparisonDetail({ session, comparisonId, onBack }: { readonly session: Session; readonly comparisonId: string; readonly onBack: () => void }) {
  const client = useQueryClient();
  const detail = useQuery({
    queryKey: ['bid-comparison', session, comparisonId],
    queryFn: async () => {
      const comparison = (await json<BidComparisonDetailResponse>(`/procurement/comparisons/${comparisonId}`, session)).comparison;
      const quotes = await Promise.all(comparison.bidders.map(async (bidder) => [bidder.selectedQuotationRevisionId, (await json<SupplierQuotationDetailResponse>(`/procurement/quotations/${bidder.selectedQuotationRevisionId}`, session)).quotation] as const));
      return { comparison, quoteMap: new Map(quotes) };
    },
  });
  const [supplierRowDescription, setSupplierRowDescription] = useState('');
  const addRow = useMutation({
    mutationFn: () => json<BidComparisonDetailResponse>(`/procurement/comparisons/${comparisonId}/rows`, session, { method: 'POST', body: JSON.stringify({ rowKind: 'SUPPLIER_ADDED', description: supplierRowDescription }) }),
    onSuccess: async () => { setSupplierRowDescription(''); await client.invalidateQueries({ queryKey: ['bid-comparison', session, comparisonId] }); },
  });
  const freeze = useMutation({
    mutationFn: () => json<FreezeBidComparisonResponse>(`/procurement/comparisons/${comparisonId}/freeze`, session, { method: 'POST', body: '{}' }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['bid-comparison', session, comparisonId] }),
        client.invalidateQueries({ queryKey: ['bid-comparisons', session] }),
      ]);
    },
  });

  if (detail.isPending) return <section className="panel"><p>Loading comparison…</p></section>;
  if (detail.isError) return <section className="panel"><p className="form-error">{detail.error.message}</p><button className="secondary-button" type="button" onClick={onBack}>Back</button></section>;
  const { comparison, quoteMap } = detail.data;
  const expectedCells = comparison.rows.length * comparison.bidders.length;
  const actualCells = comparison.rows.reduce((sum, row) => sum + row.cells.length, 0);

  return (
    <section className="comparison-detail">
      <div className="comparison-toolbar"><button className="secondary-button secondary-button--compact" type="button" onClick={onBack}>← Register</button><div><span className="status-pill">{comparison.state}</span>{comparison.comparisonNumber ? <span className="mono comparison-snapshot">{comparison.comparisonNumber}</span> : null}{comparison.snapshotId ? <span className="mono comparison-snapshot">Snapshot {comparison.snapshotId.slice(0, 8)}…</span> : null}</div></div>
      <div className="panel comparison-heading"><div><p className="panel-kicker">{comparison.comparisonNumber ?? comparison.rfqNumber}</p><h3>{comparison.title}</h3><p>{comparison.rfqTitle} · Base currency {comparison.baseCurrency} · {comparison.bidders.length} bids · {comparison.rows.length} rows</p></div><div className="comparison-readiness"><strong>{actualCells}/{expectedCells}</strong><span>explicit coverage cells</span>{comparison.state === 'DRAFT' ? <button className="primary-button primary-button--compact" type="button" disabled={actualCells !== expectedCells || freeze.isPending} onClick={() => freeze.mutate()}>{freeze.isPending ? 'Freezing…' : 'Freeze comparison'}</button> : <span className="status-pill status-pill--good">Frozen basis</span>}</div></div>
      {freeze.isError ? <p className="form-error">{freeze.error.message}</p> : null}
      {comparison.state === 'DRAFT' ? <form className="supplier-added-row" onSubmit={(event) => { event.preventDefault(); addRow.mutate(); }}><input value={supplierRowDescription} onChange={(event) => setSupplierRowDescription(event.target.value)} placeholder="Add supplier-added comparison row (freight, alternate, exclusion…)" required /><button className="secondary-button" type="submit" disabled={addRow.isPending}>+ Add row</button></form> : null}
      <div className="level-matrix-wrap">
        <table className="level-matrix">
          <thead><tr><th className="requirement-column">Requirement / leveling row</th>{comparison.bidders.map((bidder) => <th key={bidder.comparisonBidderId}><strong>{bidder.supplierCode}</strong><span>{bidder.supplierLegalName}</span><small>Quote R{bidder.quotationRevisionNo} · {bidder.quotationCurrency}{bidder.isLate ? ' · LATE' : ''}</small></th>)}</tr></thead>
          <tbody>{comparison.rows.map((row) => <tr key={row.comparisonRowId}><td className="requirement-cell"><span className="row-number">{row.rowNo}</span><strong>{row.description}</strong><span>{row.targetQuantity ?? '—'} {row.targetUomCode ?? ''}</span><small>{row.rowKind.replaceAll('_', ' ')}</small></td>{comparison.bidders.map((bidder) => <td key={bidder.comparisonBidderId}><CellEditor session={session} comparison={comparison} row={row} bidder={bidder} quotationLines={quoteMap.get(bidder.selectedQuotationRevisionId)?.lines ?? []} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

export function BidComparisonWorkspace({ session, locale: _locale }: { readonly session: Session; readonly locale: SupportedLocale }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const register = useQuery({ queryKey: ['bid-comparisons', session], queryFn: () => json<BidComparisonRegisterResponse>('/procurement/comparisons', session) });
  const responses = useQuery({ queryKey: ['supplier-responses', session], queryFn: () => json<SupplierResponseRegisterResponse>('/procurement/responses', session) });

  if (selectedId) return <ComparisonDetail session={session} comparisonId={selectedId} onBack={() => setSelectedId(null)} />;
  return (
    <section className="comparison-register">
      <div className="panel-heading comparison-register-heading"><div><p className="panel-kicker">Commercial evaluation</p><h3>Bid Comparison / Leveling</h3><p>Compare immutable supplier quotations without rewriting supplier source truth. Missing scope stays visible; normalization, buyer adjustments and supplier-confirmed contractable basis remain separate layers.</p></div><button className="primary-button primary-button--compact" type="button" onClick={() => setCreating((value) => !value)}>{creating ? 'Close' : '+ New comparison'}</button></div>
      {creating && responses.data ? <ComparisonCreate session={session} responses={responses.data.responses} onCreated={(id) => { setCreating(false); setSelectedId(id); }} /> : null}
      {register.isPending ? <div className="panel"><p>Loading comparisons…</p></div> : null}
      {register.isError ? <div className="panel"><p className="form-error">{register.error.message}</p></div> : null}
      <div className="comparison-card-grid">
        {register.data?.comparisons.map((item) => {
          const expected = item.bidderCount * item.rowCount;
          return <button className="comparison-card" type="button" key={item.comparisonId} onClick={() => setSelectedId(item.comparisonId)}><div><span className="status-pill">{item.state}</span><small>{item.comparisonNumber ?? item.rfqNumber}</small></div><strong>{item.title}</strong><span>{item.rfqTitle}</span><dl><div><dt>Bids</dt><dd>{item.bidderCount}</dd></div><div><dt>Rows</dt><dd>{item.rowCount}</dd></div><div><dt>Coverage</dt><dd>{item.explicitCellCount}/{expected}</dd></div><div><dt>Missing</dt><dd>{item.missingCellCount}</dd></div></dl></button>;
        })}
        {register.data?.comparisons.length === 0 ? <div className="panel comparison-empty"><strong>No comparison yet.</strong><span>Create one from an issued RFQ with supplier quotation revisions.</span></div> : null}
      </div>
    </section>
  );
}