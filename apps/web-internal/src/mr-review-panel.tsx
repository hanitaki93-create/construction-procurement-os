import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import type {
  MaterialRequisitionDetail,
  MaterialRequisitionDetailResponse,
  ProcurementRoute,
  ReviewMaterialRequisitionRequest,
  SetProcurementRouteRequest,
} from '@cpos/contracts';

interface DevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

interface ReviewDraft {
  readonly outcome: 'APPROVED' | 'REJECTED';
  readonly approvedQuantity: string;
}

function headers(session: DevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function mutateJson<T>(
  url: string,
  session: DevelopmentSession,
  body: unknown,
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: headers(session),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const payload = (await response.json()) as { readonly code?: string; readonly message?: string };
      detail = payload.message ?? payload.code ?? detail;
    } catch {
      // Keep HTTP fallback.
    }
    throw new Error(detail);
  }
  return (await response.json()) as T;
}

function readable(value: string): string {
  return value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function RouteControl({
  session,
  mr,
  lineId,
  currentRoute,
}: {
  readonly session: DevelopmentSession;
  readonly mr: MaterialRequisitionDetail;
  readonly lineId: string;
  readonly currentRoute: ProcurementRoute | null;
}) {
  const client = useQueryClient();
  const [route, setRoute] = useState<ProcurementRoute>(currentRoute ?? 'COMPETITIVE_RFQ');
  const [justification, setJustification] = useState('');
  const needsJustification = ['DIRECT_ORDER', 'SOLE_SOURCE_EXCEPTION', 'EXTERNAL_ERP_STOCK'].includes(route);

  const save = useMutation({
    mutationFn: () => {
      const request: SetProcurementRouteRequest = {
        route,
        ...(justification.trim() ? { justification } : {}),
      };
      return mutateJson<MaterialRequisitionDetailResponse>(
        `/procurement/requisitions/${mr.mrId}/lines/${lineId}/route`,
        session,
        request,
      );
    },
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }),
        client.invalidateQueries({ queryKey: ['procurement-mrs', session] }),
      ]);
      setJustification('');
    },
  });

  return (
    <div className="mr-route-control">
      <select value={route} onChange={(event) => setRoute(event.target.value as ProcurementRoute)} aria-label="Procurement route">
        <option value="COMPETITIVE_RFQ">Competitive RFQ</option>
        <option value="DIRECT_ORDER">Direct order</option>
        <option value="PACKAGE_SOURCING">Package sourcing</option>
        <option value="SOLE_SOURCE_EXCEPTION">Sole-source exception</option>
        <option value="EXTERNAL_ERP_STOCK">External ERP / stock</option>
      </select>
      {needsJustification ? (
        <input
          value={justification}
          onChange={(event) => setJustification(event.target.value)}
          placeholder="Required justification…"
          aria-label="Route justification"
        />
      ) : null}
      <button
        className="secondary-button secondary-button--compact"
        type="button"
        disabled={save.isPending || (needsJustification && justification.trim().length < 10)}
        onClick={() => save.mutate()}
      >
        {save.isPending ? 'Saving…' : currentRoute ? 'Change route' : 'Set route'}
      </button>
      {save.isError ? <span className="mr-inline-error" role="alert">{save.error.message}</span> : null}
    </div>
  );
}

export function MrReviewPanel({
  session,
  mr,
}: {
  readonly session: DevelopmentSession;
  readonly mr: MaterialRequisitionDetail;
}) {
  const client = useQueryClient();
  const initial = useMemo(
    () =>
      Object.fromEntries(
        mr.lines.map((line) => [
          line.mrLineId,
          {
            outcome: 'APPROVED' as const,
            approvedQuantity: line.requestedQuantity,
          },
        ]),
      ) as Record<string, ReviewDraft>,
    [mr.lines],
  );
  const [decisions, setDecisions] = useState<Record<string, ReviewDraft>>(initial);
  const [comments, setComments] = useState('');

  const review = useMutation({
    mutationFn: () => {
      const request: ReviewMaterialRequisitionRequest = {
        lineDecisions: mr.lines.map((line) => {
          const draft = decisions[line.mrLineId] ?? {
            outcome: 'APPROVED' as const,
            approvedQuantity: line.requestedQuantity,
          };
          return draft.outcome === 'REJECTED'
            ? { mrLineId: line.mrLineId, outcome: 'REJECTED' as const }
            : {
                mrLineId: line.mrLineId,
                outcome: 'APPROVED' as const,
                approvedQuantity: draft.approvedQuantity,
              };
        }),
        ...(comments.trim() ? { comments } : {}),
      };
      return mutateJson<MaterialRequisitionDetailResponse>(
        `/procurement/requisitions/${mr.mrId}/review`,
        session,
        request,
      );
    },
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }),
        client.invalidateQueries({ queryKey: ['procurement-mrs', session] }),
      ]);
    },
  });

  const reviewable = mr.status === 'SUBMITTED' || mr.status === 'UNDER_REVIEW';
  const routable = mr.status === 'APPROVED' || mr.status === 'PARTIALLY_APPROVED';

  return (
    <section className="mr-decision-panel" aria-labelledby="mr-decision-title">
      <div className="mr-decision-panel__heading">
        <div>
          <span className="proc-kicker">Decision & route</span>
          <h3 id="mr-decision-title">Turn approved demand into procurement action</h3>
          <p>Approval decides how much demand is authorized. Routing decides how the approved line will be procured.</p>
        </div>
      </div>

      {reviewable ? (
        <div className="mr-review-workspace">
          <div className="mr-review-lines">
            {mr.lines.map((line) => {
              const draft = decisions[line.mrLineId] ?? initial[line.mrLineId];
              if (!draft) return null;
              return (
                <div className="mr-review-line" key={line.mrLineId}>
                  <div className="mr-review-line__identity">
                    <strong>{line.lineNo} · {line.description}</strong>
                    <span>{line.requestedQuantity} {line.uomCode} requested</span>
                  </div>
                  <label>
                    <span>Decision</span>
                    <select
                      value={draft.outcome}
                      onChange={(event) => {
                        const outcome = event.target.value as ReviewDraft['outcome'];
                        setDecisions((current) => ({
                          ...current,
                          [line.mrLineId]: { ...draft, outcome },
                        }));
                      }}
                    >
                      <option value="APPROVED">Approve</option>
                      <option value="REJECTED">Reject</option>
                    </select>
                  </label>
                  <label>
                    <span>Approved quantity</span>
                    <input
                      inputMode="decimal"
                      value={draft.approvedQuantity}
                      disabled={draft.outcome === 'REJECTED'}
                      onChange={(event) =>
                        setDecisions((current) => ({
                          ...current,
                          [line.mrLineId]: { ...draft, approvedQuantity: event.target.value },
                        }))
                      }
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <label className="mr-review-comments">
            <span>Review comments</span>
            <textarea value={comments} onChange={(event) => setComments(event.target.value)} rows={3} placeholder="Decision basis, rejected line reason, quantity adjustment…" />
          </label>
          {review.isError ? <p className="form-error" role="alert">{review.error.message}</p> : null}
          <div className="mr-decision-panel__actions">
            <span>One decision is required for every line.</span>
            <button className="primary-button" type="button" disabled={review.isPending} onClick={() => review.mutate()}>
              {review.isPending ? 'Recording review…' : 'Record review'}
            </button>
          </div>
        </div>
      ) : null}

      {routable ? (
        <div className="mr-route-workspace">
          {mr.lines.filter((line) => line.approvedQuantity !== null && line.lineState !== 'REJECTED').map((line) => (
            <div className="mr-route-line" key={line.mrLineId}>
              <div>
                <strong>{line.lineNo} · {line.description}</strong>
                <span>
                  Approved {line.approvedQuantity} {line.uomCode}
                  {line.routeDecision ? ` · Current: ${readable(line.routeDecision.route)}` : ' · Route not set'}
                </span>
              </div>
              <RouteControl
                session={session}
                mr={mr}
                lineId={line.mrLineId}
                currentRoute={line.routeDecision?.route ?? null}
              />
            </div>
          ))}
        </div>
      ) : null}

      {mr.reviewTrail.length > 0 ? (
        <div className="mr-review-trail">
          <strong>Review history</strong>
          {mr.reviewTrail.map((entry) => (
            <div key={entry.reviewOccurrenceId}>
              <span>{readable(entry.decision)}</span>
              <span>{entry.reviewerName}</span>
              <time>{new Date(entry.occurredAt).toLocaleString()}</time>
              <p>{entry.comments ?? 'No review comment'}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
