import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type {
  BidComparisonDetail,
  BidComparisonDetailResponse,
  ComparisonBidder,
  ComparisonCell,
  ComparisonRow,
  ConfirmComparisonBasisRequest,
} from '@cpos/contracts/procurement-comparison';

interface Session {
  readonly tenantId: string;
  readonly principalId: string;
}

interface SourcePreview {
  readonly supplierDescription: string;
  readonly quotedQuantity: string | null;
  readonly quotedUomCode: string | null;
  readonly unitRate: string | null;
  readonly lineAmount: string | null;
  readonly sourceReference?: string | null;
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

export function ConfirmedBasisEditor({
  session,
  comparison,
  row,
  bidder,
  cell,
  source,
}: {
  readonly session: Session;
  readonly comparison: BidComparisonDetail;
  readonly row: ComparisonRow;
  readonly bidder: ComparisonBidder;
  readonly cell: ComparisonCell | undefined;
  readonly source: SourcePreview | null;
}) {
  const client = useQueryClient();
  const basis = cell?.confirmedBasis ?? null;
  const [description, setDescription] = useState(basis?.confirmedDescription ?? source?.supplierDescription ?? '');
  const [quantity, setQuantity] = useState(basis?.confirmedQuantity ?? source?.quotedQuantity ?? '');
  const [uom, setUom] = useState(basis?.confirmedUomCode ?? source?.quotedUomCode ?? '');
  const [unitRate, setUnitRate] = useState(basis?.confirmedUnitRate ?? source?.unitRate ?? '');
  const [amount, setAmount] = useState(basis?.confirmedAmount ?? source?.lineAmount ?? '');

  const confirm = useMutation({
    mutationFn: () => {
      const terms = Object.fromEntries([
        ['paymentTerms', bidder.paymentTerms],
        ['leadTimePromise', bidder.leadTimePromise],
        ['deliveryPromise', bidder.deliveryPromise],
        ['warrantyTerms', bidder.warrantyTerms],
      ].filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0));
      const request: ConfirmComparisonBasisRequest = {
        confirmationKind: 'QUOTATION_REVISION',
        sourceQuotationRevisionId: bidder.selectedQuotationRevisionId,
        ...(source?.sourceReference ? { sourceConfirmationRefs: [source.sourceReference] } : {}),
        confirmedDescription: description,
        ...(quantity ? { confirmedQuantity: quantity } : {}),
        ...(uom ? { confirmedUomCode: uom } : {}),
        ...(unitRate ? { confirmedUnitRate: unitRate } : {}),
        confirmedAmount: amount,
        currency: bidder.quotationCurrency,
        ...(Object.keys(terms).length > 0 ? { confirmedTerms: terms } : {}),
      };
      return json<BidComparisonDetailResponse>(
        `/procurement/comparisons/${comparison.comparisonId}/rows/${row.comparisonRowId}/bidders/${bidder.comparisonBidderId}/confirmed-basis`,
        session,
        { method: 'POST', body: JSON.stringify(request) },
      );
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['bid-comparison', session, comparison.comparisonId] });
    },
  });

  function loadSource() {
    if (!source) return;
    setDescription(source.supplierDescription);
    setQuantity(source.quotedQuantity ?? '');
    setUom(source.quotedUomCode ?? '');
    setUnitRate(source.unitRate ?? '');
    setAmount(source.lineAmount ?? '');
  }

  return (
    <div className="level-confirmed">
      <span className="layer-label">Supplier-confirmed contractable basis</span>
      {basis ? (
        <div className="confirmed-basis-summary">
          <strong>{basis.currency} {basis.confirmedAmount}</strong>
          <span>v{basis.basisVersion} · {basis.confirmationKind.replaceAll('_', ' ')}</span>
          <span>{basis.confirmedDescription}</span>
          <small>{basis.confirmedQuantity ?? '—'} {basis.confirmedUomCode ?? ''}{basis.confirmedUnitRate ? ` @ ${basis.confirmedUnitRate}` : ''}</small>
        </div>
      ) : <span className="source-truth source-truth--empty">No supplier-confirmed awardable basis recorded.</span>}
      {comparison.state === 'DRAFT' ? (
        <>
          <div className="level-mini-grid">
            <input placeholder="Confirmed qty" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <input placeholder="Confirmed UOM" value={uom} onChange={(event) => setUom(event.target.value)} />
            <input placeholder="Confirmed unit rate" value={unitRate} onChange={(event) => setUnitRate(event.target.value)} />
            <input placeholder="Confirmed amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </div>
          <textarea placeholder="Supplier-confirmed scope / description" value={description} onChange={(event) => setDescription(event.target.value)} />
          <div className="confirmed-basis-actions">
            <button className="secondary-button secondary-button--compact" type="button" disabled={!source} onClick={loadSource}>Load supplier source</button>
            <button className="primary-button primary-button--compact" type="button" disabled={!description.trim() || !amount.trim() || confirm.isPending} onClick={() => confirm.mutate()}>{confirm.isPending ? 'Confirming…' : basis ? 'Append confirmed revision' : 'Confirm supplier basis'}</button>
          </div>
          <small className="confirmed-basis-warning">Buyer evaluation adjustments above remain internal and are not copied here automatically.</small>
        </>
      ) : null}
      {confirm.isError ? <small className="form-error">{confirm.error.message}</small> : null}
    </div>
  );
}
