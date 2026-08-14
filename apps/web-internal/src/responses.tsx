import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';

import type { RfqListResponse } from '@cpos/contracts';
import type {
  CreateSupplierQuotationRequest,
  CreateSupplierQuotationResponse,
  IssueRfqResponse,
  QuotationLineType,
  RecordSupplierIntentRequest,
  RecordSupplierIntentResponse,
  RfqIssueDetail,
  SupplierQuotationDetailResponse,
  SupplierResponseRegisterResponse,
  SupplierResponseRegisterRow,
} from '@cpos/contracts/procurement-responses';
import type { SupportedLocale } from '@cpos/ui-foundation';

import './procurement.css';
import './responses.css';

interface DevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

class ResponseApiError extends Error {
  public constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ResponseApiError';
  }
}

function sessionHeaders(session: DevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function responseJson<T>(
  url: string,
  session: DevelopmentSession,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...sessionHeaders(session),
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as {
        readonly code?: string;
        readonly message?: string;
      };
      detail = body.message ?? body.code ?? detail;
    } catch {
      // Keep the HTTP fallback.
    }
    throw new ResponseApiError(response.status, detail);
  }
  return (await response.json()) as T;
}

function readable(value: string): string {
  return value
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function localDate(value: string | null): string {
  return value === null ? '—' : new Date(value).toLocaleString();
}

function responseTone(value: string): 'good' | 'attention' | 'neutral' {
  if (['WILL_BID', 'RECEIVED', 'FINAL', 'STRUCTURED', 'ISSUED', 'INVITED'].includes(value)) return 'good';
  if (['NO_BID', 'WITHDRAWN', 'LATE', 'NO_RESPONSE'].includes(value)) return 'attention';
  return 'neutral';
}

function ResponseStatus({ value }: { readonly value: string }) {
  return (
    <span className={`proc-status proc-status--${responseTone(value)}`}>
      {readable(value)}
    </span>
  );
}

function dateValue(days: number): string {
  const value = new Date();
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
}

interface CaptureLineState {
  readonly localId: string;
  readonly rfqIssueLineId?: string;
  readonly rfqLineNo?: number;
  readonly issuedDescription?: string;
  readonly issuedQuantity?: string;
  readonly issuedUom?: string;
  readonly lineType: QuotationLineType;
  readonly supplierDescription: string;
  readonly quotedQuantity: string;
  readonly quotedUomCode: string;
  readonly unitRate: string;
  readonly lineAmount: string;
  readonly taxAmount: string;
  readonly brand: string;
  readonly model: string;
  readonly inclusionExclusionNote: string;
  readonly deviationNote: string;
  readonly sourceReference: string;
}

function initialCaptureLines(issue: RfqIssueDetail): CaptureLineState[] {
  return issue.lines.map((line) => ({
    localId: line.rfqIssueLineId,
    rfqIssueLineId: line.rfqIssueLineId,
    rfqLineNo: line.lineNo,
    issuedDescription: line.description,
    issuedQuantity: line.quantity,
    issuedUom: line.uomCode,
    lineType: 'BASE',
    supplierDescription: line.description,
    quotedQuantity: line.quantity,
    quotedUomCode: line.uomCode,
    unitRate: '',
    lineAmount: '',
    taxAmount: '',
    brand: '',
    model: '',
    inclusionExclusionNote: '',
    deviationNote: '',
    sourceReference: '',
  }));
}

function QuotationCaptureForm({
  session,
  response,
  issue,
  onDone,
}: {
  readonly session: DevelopmentSession;
  readonly response: SupplierResponseRegisterRow;
  readonly issue: RfqIssueDetail;
  readonly onDone: (quotationRevisionId?: string) => void;
}) {
  const client = useQueryClient();
  const [supplierReference, setSupplierReference] = useState('');
  const [quotationDate, setQuotationDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState(issue.currency);
  const [validityUntil, setValidityUntil] = useState(dateValue(30));
  const [paymentTerms, setPaymentTerms] = useState(issue.paymentTermRequirement ?? '');
  const [leadTimePromise, setLeadTimePromise] = useState('');
  const [deliveryPromise, setDeliveryPromise] = useState('');
  const [warrantyTerms, setWarrantyTerms] = useState('');
  const [commercialNotes, setCommercialNotes] = useState('');
  const [responseChannel, setResponseChannel] = useState<CreateSupplierQuotationRequest['responseChannel']>('BUYER_CAPTURE');
  const [sourceFileName, setSourceFileName] = useState('');
  const [sourceChannelReference, setSourceChannelReference] = useState('');
  const [lines, setLines] = useState<CaptureLineState[]>(() => initialCaptureLines(issue));

  const nextRevision = (response.latestRevisionNo ?? -1) + 1;

  const create = useMutation({
    mutationFn: async () => {
      const request: CreateSupplierQuotationRequest = {
        supplierQuotationReference: supplierReference.trim() || undefined,
        quotationDate: quotationDate || undefined,
        responseChannel,
        captureMode: 'BUYER_ON_BEHALF',
        currency: currency.trim().toUpperCase(),
        validityUntil: validityUntil || undefined,
        leadTimePromise: leadTimePromise.trim() || undefined,
        deliveryPromise: deliveryPromise.trim() || undefined,
        paymentTerms: paymentTerms.trim() || undefined,
        warrantyTerms: warrantyTerms.trim() || undefined,
        commercialNotes: commercialNotes.trim() || undefined,
        responseStatus: 'RECEIVED',
        sourceFileName: sourceFileName.trim() || undefined,
        sourceChannelReference: sourceChannelReference.trim() || undefined,
        lines: lines.map((line) => ({
          ...(line.rfqIssueLineId ? { rfqIssueLineId: line.rfqIssueLineId } : {}),
          supplierDescription: line.supplierDescription,
          ...(line.quotedQuantity.trim() ? { quotedQuantity: line.quotedQuantity.trim() } : {}),
          ...(line.quotedUomCode.trim() ? { quotedUomCode: line.quotedUomCode.trim() } : {}),
          ...(line.unitRate.trim() ? { unitRate: line.unitRate.trim() } : {}),
          ...(line.lineAmount.trim() ? { lineAmount: line.lineAmount.trim() } : {}),
          ...(line.taxAmount.trim() ? { taxAmount: line.taxAmount.trim() } : {}),
          ...(line.brand.trim() ? { brand: line.brand.trim() } : {}),
          ...(line.model.trim() ? { model: line.model.trim() } : {}),
          ...(line.inclusionExclusionNote.trim() ? { inclusionExclusionNote: line.inclusionExclusionNote.trim() } : {}),
          ...(line.deviationNote.trim() ? { deviationNote: line.deviationNote.trim() } : {}),
          ...(line.sourceReference.trim() ? { sourceReference: line.sourceReference.trim() } : {}),
          lineType: line.lineType,
        })),
      };
      return responseJson<CreateSupplierQuotationResponse>(
        `/procurement/rfqs/${response.rfqId}/bidders/${response.sourceRfqBidderId}/quotations`,
        session,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(request),
        },
      );
    },
    onSuccess: async (result) => {
      await client.invalidateQueries({ queryKey: ['supplier-responses', session] });
      onDone(result.quotation.quotationRevisionId);
    },
  });

  function updateLine(localId: string, patch: Partial<CaptureLineState>) {
    setLines((current) => current.map((line) => line.localId === localId ? { ...line, ...patch } : line));
  }

  function addUnmappedLine() {
    setLines((current) => [
      ...current,
      {
        localId: `unmapped-${Date.now()}-${current.length}`,
        lineType: 'UNMAPPED',
        supplierDescription: '',
        quotedQuantity: '',
        quotedUomCode: '',
        unitRate: '',
        lineAmount: '',
        taxAmount: '',
        brand: '',
        model: '',
        inclusionExclusionNote: '',
        deviationNote: '',
        sourceReference: '',
      },
    ]);
  }

  function removeUnmappedLine(localId: string) {
    setLines((current) => current.filter((line) => line.localId !== localId));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    create.mutate();
  }

  const invalid = lines.length === 0 || lines.some((line) => !line.supplierDescription.trim());

  return (
    <form className="proc-form proc-form--wide rsp-capture" onSubmit={submit}>
      <div className="proc-form__heading">
        <div>
          <span className="proc-kicker">Supplier source quotation</span>
          <h3>{response.supplierCode} — {response.supplierLegalName}</h3>
          <p>{response.rfqNumber} · capture immutable revision R{nextRevision}. Supplier wording and discrepancies are preserved for later comparison.</p>
        </div>
        <button className="secondary-button" type="button" onClick={() => onDone()}>Cancel</button>
      </div>

      {response.intent === 'NO_BID' ? (
        <div className="proc-warning">This supplier is currently recorded as No Bid. Record Will Bid before capturing a quotation.</div>
      ) : null}

      <div className="proc-form-grid proc-form-grid--4">
        <label><span>Supplier quote reference</span><input value={supplierReference} onChange={(event) => setSupplierReference(event.target.value)} placeholder="QT-2026-184" /></label>
        <label><span>Quotation date</span><input type="date" value={quotationDate} onChange={(event) => setQuotationDate(event.target.value)} /></label>
        <label><span>Currency</span><input maxLength={3} value={currency} onChange={(event) => setCurrency(event.target.value.toUpperCase())} required /></label>
        <label><span>Validity until</span><input type="date" value={validityUntil} onChange={(event) => setValidityUntil(event.target.value)} /></label>
        <label><span>Response channel</span><select value={responseChannel} onChange={(event) => setResponseChannel(event.target.value as CreateSupplierQuotationRequest['responseChannel'])}><option value="BUYER_CAPTURE">Buyer capture</option><option value="EMAIL">Email</option><option value="FILE_UPLOAD">File upload</option><option value="SECURE_TASK">Secure task</option><option value="OTHER">Other</option></select></label>
        <label><span>Lead time promise</span><input value={leadTimePromise} onChange={(event) => setLeadTimePromise(event.target.value)} placeholder="4–5 weeks from approved drawing" /></label>
        <label><span>Delivery promise</span><input value={deliveryPromise} onChange={(event) => setDeliveryPromise(event.target.value)} placeholder="Partial delivery by floor" /></label>
        <label><span>Source filename</span><input value={sourceFileName} onChange={(event) => setSourceFileName(event.target.value)} placeholder="supplier-quotation-r0.pdf" /></label>
        <label className="proc-span-2"><span>Payment terms</span><input value={paymentTerms} onChange={(event) => setPaymentTerms(event.target.value)} /></label>
        <label className="proc-span-2"><span>Warranty terms</span><input value={warrantyTerms} onChange={(event) => setWarrantyTerms(event.target.value)} /></label>
        <label className="proc-span-2"><span>Source / email reference</span><input value={sourceChannelReference} onChange={(event) => setSourceChannelReference(event.target.value)} placeholder="Email subject, message ID or document reference" /></label>
        <label className="proc-span-2"><span>Commercial notes as received</span><textarea rows={3} value={commercialNotes} onChange={(event) => setCommercialNotes(event.target.value)} /></label>
      </div>

      <div className="rsp-section-heading">
        <div><strong>Supplier quotation lines</strong><span>Issued RFQ values are shown only as reference. Enter what the supplier actually returned.</span></div>
        <button className="secondary-button" type="button" onClick={addUnmappedLine}>+ Supplier-added line</button>
      </div>

      <div className="rsp-line-list">
        {lines.map((line) => (
          <section className={`rsp-line-card${line.lineType === 'UNMAPPED' ? ' rsp-line-card--unmapped' : ''}`} key={line.localId}>
            <div className="rsp-line-card__source">
              <div>
                <span className="proc-kicker">{line.lineType === 'UNMAPPED' ? 'Supplier added' : `Issued line ${line.rfqLineNo}`}</span>
                <strong>{line.issuedDescription ?? 'No RFQ mapping — preserve as supplier-added source line'}</strong>
                {line.issuedQuantity ? <small>Issued basis: {line.issuedQuantity} {line.issuedUom}</small> : null}
              </div>
              {line.lineType === 'UNMAPPED' ? <button className="rsp-remove" type="button" onClick={() => removeUnmappedLine(line.localId)}>Remove</button> : null}
            </div>
            <div className="rsp-line-grid">
              <label className="rsp-span-3"><span>Supplier description</span><textarea rows={2} value={line.supplierDescription} onChange={(event) => updateLine(line.localId, { supplierDescription: event.target.value })} required /></label>
              <label><span>Line type</span><select value={line.lineType} onChange={(event) => updateLine(line.localId, { lineType: event.target.value as QuotationLineType })} disabled={!line.rfqIssueLineId}><option value="BASE">Base</option><option value="ALTERNATE">Alternate</option><option value="SUBSTITUTE">Substitute</option>{!line.rfqIssueLineId ? <option value="UNMAPPED">Unmapped</option> : null}</select></label>
              <label><span>Quoted qty</span><input inputMode="decimal" value={line.quotedQuantity} onChange={(event) => updateLine(line.localId, { quotedQuantity: event.target.value })} /></label>
              <label><span>Supplier UOM</span><input value={line.quotedUomCode} onChange={(event) => updateLine(line.localId, { quotedUomCode: event.target.value })} placeholder="EA / CTN / LS" /></label>
              <label><span>Unit rate</span><input inputMode="decimal" value={line.unitRate} onChange={(event) => updateLine(line.localId, { unitRate: event.target.value })} /></label>
              <label><span>Line amount</span><input inputMode="decimal" value={line.lineAmount} onChange={(event) => updateLine(line.localId, { lineAmount: event.target.value })} /></label>
              <label><span>Tax amount</span><input inputMode="decimal" value={line.taxAmount} onChange={(event) => updateLine(line.localId, { taxAmount: event.target.value })} /></label>
              <label><span>Brand</span><input value={line.brand} onChange={(event) => updateLine(line.localId, { brand: event.target.value })} /></label>
              <label><span>Model</span><input value={line.model} onChange={(event) => updateLine(line.localId, { model: event.target.value })} /></label>
              <label><span>Source reference</span><input value={line.sourceReference} onChange={(event) => updateLine(line.localId, { sourceReference: event.target.value })} placeholder="PDF p.2 / Excel row 18" /></label>
              <label className="rsp-span-2"><span>Inclusion / exclusion note</span><textarea rows={2} value={line.inclusionExclusionNote} onChange={(event) => updateLine(line.localId, { inclusionExclusionNote: event.target.value })} /></label>
              <label className="rsp-span-2"><span>Deviation note</span><textarea rows={2} value={line.deviationNote} onChange={(event) => updateLine(line.localId, { deviationNote: event.target.value })} /></label>
            </div>
          </section>
        ))}
      </div>

      {create.isError ? <p className="form-error" role="alert">{create.error.message}</p> : null}
      <div className="proc-form__actions">
        <span className="proc-hint">No normalization is performed here. R{nextRevision} becomes immutable supplier-source truth after save.</span>
        <button className="primary-button" type="submit" disabled={create.isPending || invalid || response.intent === 'NO_BID'}>{create.isPending ? 'Saving…' : `Save quotation R${nextRevision}`}</button>
      </div>
    </form>
  );
}

function QuotationDetail({
  session,
  quotationRevisionId,
  onClose,
}: {
  readonly session: DevelopmentSession;
  readonly quotationRevisionId: string;
  readonly onClose: () => void;
}) {
  const detail = useQuery({
    queryKey: ['supplier-quotation', session, quotationRevisionId],
    queryFn: () => responseJson<SupplierQuotationDetailResponse>(`/procurement/quotations/${quotationRevisionId}`, session),
  });

  if (detail.isPending) return <div className="proc-loading">Opening supplier quotation…</div>;
  if (detail.isError) return <div className="proc-error"><strong>Quotation unavailable</strong><span>{detail.error.message}</span><button className="secondary-button" type="button" onClick={onClose}>Back</button></div>;

  const value = detail.data.quotation;
  return (
    <div className="proc-detail">
      <div className="proc-detail__header">
        <div><button className="proc-back" type="button" onClick={onClose}>← Supplier responses</button><span className="proc-kicker">Immutable supplier quotation</span><h2>{value.supplierCode} · R{value.revisionNo}</h2><p>{value.rfqNumber} — {value.rfqTitle}</p></div>
        <div className="rsp-detail-status"><ResponseStatus value={value.responseStatus} />{value.isLate ? <ResponseStatus value="LATE" /> : null}</div>
      </div>
      <div className="proc-detail-grid">
        <div><span>Supplier</span><strong>{value.supplierLegalName}</strong></div>
        <div><span>Supplier quote ref</span><strong>{value.supplierQuotationReference ?? '—'}</strong></div>
        <div><span>Received</span><strong>{localDate(value.receivedAt)}</strong></div>
        <div><span>Channel</span><strong>{readable(value.responseChannel)}</strong></div>
        <div><span>Currency / validity</span><strong>{value.currency} · {value.validityUntil ?? '—'}</strong></div>
        <div><span>Issued RFQ basis</span><strong>R{value.issueRevisionNo}</strong></div>
      </div>

      <div className="rsp-revision-strip">
        <span>Revision history</span>
        <div>{detail.data.revisionHistory.map((revision) => <span className={revision.quotationRevisionId === value.quotationRevisionId ? 'rsp-revision-chip rsp-revision-chip--active' : 'rsp-revision-chip'} key={revision.quotationRevisionId}>R{revision.revisionNo} · {new Date(revision.receivedAt).toLocaleDateString()}</span>)}</div>
      </div>

      <div className="proc-table-wrap">
        <table className="proc-table proc-table--lines">
          <thead><tr><th>RFQ line</th><th>Supplier description</th><th>Qty / UOM</th><th>Rate</th><th>Amount / tax</th><th>Brand / model</th><th>Source</th></tr></thead>
          <tbody>{value.lines.map((line) => <tr key={line.quotationLineId}><td>{line.rfqLineNo ?? 'Unmapped'}<small>{readable(line.lineType)}</small></td><td><strong>{line.supplierDescription}</strong><small>{line.deviationNote ?? line.inclusionExclusionNote ?? 'No supplier note captured'}</small></td><td>{line.quotedQuantity ?? '—'} {line.quotedUomCode ?? ''}</td><td>{line.unitRate ?? '—'}</td><td>{line.lineAmount ?? '—'}<small>Tax {line.taxAmount ?? '—'}</small></td><td>{line.brand ?? '—'}<small>{line.model ?? ''}</small></td><td>{line.sourceReference ?? '—'}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="rsp-commercial-grid">
        <div><span>Payment terms</span><p>{value.paymentTerms ?? '—'}</p></div>
        <div><span>Lead / delivery promise</span><p>{value.leadTimePromise ?? '—'}{value.deliveryPromise ? ` · ${value.deliveryPromise}` : ''}</p></div>
        <div><span>Warranty</span><p>{value.warrantyTerms ?? '—'}</p></div>
        <div><span>Source provenance</span><p>{value.sourceFileName ?? 'No filename'}{value.sourceChannelReference ? ` · ${value.sourceChannelReference}` : ''}</p></div>
      </div>
      {value.commercialNotes ? <div className="proc-note"><span>Supplier commercial notes</span><p>{value.commercialNotes}</p></div> : null}
      <div className="src-lineage-note"><strong>Source truth</strong><span>RFQ {value.rfqNumber} issue R{value.issueRevisionNo} · quotation R{value.revisionNo}{value.supersedesRevisionId ? ' supersedes prior immutable revision' : ' initial response'}</span></div>
    </div>
  );
}

function ResponseRegister({
  session,
  rows,
  onCapture,
  onOpenQuotation,
}: {
  readonly session: DevelopmentSession;
  readonly rows: readonly SupplierResponseRegisterRow[];
  readonly onCapture: (row: SupplierResponseRegisterRow) => void;
  readonly onOpenQuotation: (quotationRevisionId: string) => void;
}) {
  const client = useQueryClient();
  const [intentPending, setIntentPending] = useState<string | null>(null);

  const intent = useMutation({
    mutationFn: async ({ row, value }: { readonly row: SupplierResponseRegisterRow; readonly value: 'WILL_BID' | 'NO_BID' }) => {
      setIntentPending(row.rfqIssueBidderId);
      const request: RecordSupplierIntentRequest = {
        intent: value,
        channel: 'BUYER_CAPTURE',
        ...(value === 'NO_BID' ? { reason: 'Recorded by buyer from supplier communication' } : {}),
      };
      return responseJson<RecordSupplierIntentResponse>(
        `/procurement/rfqs/${row.rfqId}/bidders/${row.sourceRfqBidderId}/intent`,
        session,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(request),
        },
      );
    },
    onSettled: () => setIntentPending(null),
    onSuccess: async () => client.invalidateQueries({ queryKey: ['supplier-responses', session] }),
  });

  return (
    <div className="proc-table-wrap rsp-register-wrap">
      <table className="proc-table rsp-register">
        <thead><tr><th>RFQ</th><th>Supplier</th><th>Intent</th><th>Latest response</th><th>Received / validity</th><th>Completeness</th><th>Actions</th></tr></thead>
        <tbody>{rows.map((row) => (
          <tr key={row.rfqIssueBidderId}>
            <td><strong className="proc-number">{row.rfqNumber}</strong><small>Issue R{row.issueRevisionNo} · due {new Date(row.responseDueAt).toLocaleString()}</small></td>
            <td><strong>{row.supplierCode} — {row.supplierLegalName}</strong><small>{row.contactName ?? 'No tender contact'}{row.contactEmail ? ` · ${row.contactEmail}` : ''}</small></td>
            <td><ResponseStatus value={row.intent ?? 'INVITED'} />{row.intentReason ? <small>{row.intentReason}</small> : null}</td>
            <td>{row.latestRevisionNo === null ? <span className="rsp-muted">No quotation</span> : <button className="rsp-link" type="button" onClick={() => row.latestQuotationRevisionId && onOpenQuotation(row.latestQuotationRevisionId)}>Quotation R{row.latestRevisionNo}</button>}<small>{row.responseChannel ? readable(row.responseChannel) : 'Awaiting response'}{row.isLate ? ' · Late' : ''}</small></td>
            <td>{localDate(row.receivedAt)}<small>Valid to {row.validityUntil ?? '—'}</small></td>
            <td><ResponseStatus value={row.completeness} /><small>{row.lineCount} captured line{row.lineCount === 1 ? '' : 's'}</small></td>
            <td><div className="rsp-actions"><button className="rsp-action-button" type="button" disabled={intentPending === row.rfqIssueBidderId} onClick={() => intent.mutate({ row, value: 'WILL_BID' })}>Will bid</button><button className="rsp-action-button" type="button" disabled={intentPending === row.rfqIssueBidderId} onClick={() => intent.mutate({ row, value: 'NO_BID' })}>No bid</button><button className="primary-button primary-button--compact" type="button" disabled={row.intent === 'NO_BID'} onClick={() => onCapture(row)}>{row.latestRevisionNo === null ? 'Capture quote' : `Add R${row.latestRevisionNo + 1}`}</button></div></td>
          </tr>
        ))}</tbody>
      </table>
      {intent.isError ? <p className="form-error" role="alert">{intent.error.message}</p> : null}
    </div>
  );
}

export function SupplierResponseWorkspace({
  session,
  locale,
}: {
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
}) {
  const client = useQueryClient();
  const [capture, setCapture] = useState<SupplierResponseRegisterRow | null>(null);
  const [openQuotationId, setOpenQuotationId] = useState<string | null>(null);

  const rfqs = useQuery({
    queryKey: ['sourcing-rfqs', session],
    queryFn: () => responseJson<RfqListResponse>('/procurement/rfqs', session),
  });
  const responses = useQuery({
    queryKey: ['supplier-responses', session],
    queryFn: () => responseJson<SupplierResponseRegisterResponse>('/procurement/responses', session),
  });
  const captureIssue = useQuery({
    queryKey: ['rfq-issue', session, capture?.rfqId],
    enabled: capture !== null,
    queryFn: () => responseJson<IssueRfqResponse>(`/procurement/rfqs/${capture!.rfqId}/issue`, session),
  });

  const issue = useMutation({
    mutationFn: (rfqId: string) => responseJson<IssueRfqResponse>(`/procurement/rfqs/${rfqId}/issue`, session, { method: 'POST' }),
    onSuccess: async (result) => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['sourcing-rfqs', session] }),
        client.invalidateQueries({ queryKey: ['supplier-responses', session] }),
        client.setQueryData(['rfq-issue', session, result.issue.rfqId], result),
      ]);
    },
  });

  const draftRfqs = useMemo(
    () => (rfqs.data?.rfqs ?? []).filter((rfq) => ['DRAFT', 'REVIEW', 'READY'].includes(rfq.status)),
    [rfqs.data],
  );
  const rows = responses.data?.responses ?? [];

  if (openQuotationId !== null) {
    return <QuotationDetail session={session} quotationRevisionId={openQuotationId} onClose={() => setOpenQuotationId(null)} />;
  }
  if (capture !== null && captureIssue.data) {
    return <QuotationCaptureForm session={session} response={capture} issue={captureIssue.data.issue} onDone={(quotationRevisionId) => { setCapture(null); if (quotationRevisionId) setOpenQuotationId(quotationRevisionId); }} />;
  }
  if (capture !== null && captureIssue.isPending) return <div className="proc-loading">Loading immutable issued RFQ basis…</div>;
  if (capture !== null && captureIssue.isError) return <div className="proc-error"><strong>Issued RFQ basis unavailable</strong><span>{captureIssue.error.message}</span><button className="secondary-button" type="button" onClick={() => setCapture(null)}>Back</button></div>;

  const copy = locale === 'ar'
    ? {
        title: 'ردود الموردين والعروض',
        body: 'أصدر طلب السعر على أساس ثابت، وسجل نية المورد، واحفظ كل مراجعة للعرض دون الكتابة فوق المصدر السابق.',
      }
    : {
        title: 'Supplier Responses & Quotations',
        body: 'Issue an RFQ on an immutable basis, track supplier intent, and preserve every quotation revision as source truth before comparison.',
      };

  return (
    <div className="proc-page">
      <div className="proc-page__header"><div><span className="proc-kicker">Supplier commercial return</span><h2>{copy.title}</h2><p>{copy.body}</p></div></div>

      {draftRfqs.length > 0 ? (
        <section className="rsp-issue-panel">
          <div className="rsp-section-heading"><div><strong>RFQs ready to issue</strong><span>Issuing freezes the current header, pricing lines and selected bidders as the supplier-response basis.</span></div><span className="proc-count">{draftRfqs.length}</span></div>
          <div className="rsp-issue-grid">{draftRfqs.map((rfq) => <article key={rfq.rfqId}><div><span className="proc-kicker">{rfq.eventType} · R{rfq.revisionNo}</span><strong>{rfq.rfqNumber}</strong><p>{rfq.title}</p><small>{rfq.projectCode} · {rfq.sourceLineCount} lines · {rfq.bidderCount} bidders · due {new Date(rfq.responseDueAt).toLocaleString()}</small></div><button className="primary-button primary-button--compact" type="button" disabled={issue.isPending} onClick={() => issue.mutate(rfq.rfqId)}>{issue.isPending ? 'Issuing…' : 'Issue RFQ'}</button></article>)}</div>
          {issue.isError ? <p className="form-error" role="alert">{issue.error.message}</p> : null}
        </section>
      ) : null}

      <div className="rsp-section-heading"><div><strong>Supplier response register</strong><span>Invitation, intent and submission remain separate commercial facts. Latest response never overwrites revision history.</span></div><span className="proc-count">{rows.length} bidder{rows.length === 1 ? '' : 's'}</span></div>
      {responses.isPending || rfqs.isPending ? <div className="proc-loading">Loading supplier responses…</div> : null}
      {responses.isError ? <div className="proc-error"><strong>Response register unavailable</strong><span>{responses.error.message}</span><button className="secondary-button" type="button" onClick={() => responses.refetch()}>Retry</button></div> : null}
      {rows.length === 0 && responses.data ? <div className="proc-empty"><div className="proc-empty__mark" aria-hidden="true">Q</div><strong>No issued bidder responses yet</strong><p>Issue a draft RFQ above. Its selected bidders will appear here without re-entry.</p></div> : null}
      {rows.length > 0 ? <ResponseRegister session={session} rows={rows} onCapture={setCapture} onOpenQuotation={setOpenQuotationId} /> : null}
    </div>
  );
}
