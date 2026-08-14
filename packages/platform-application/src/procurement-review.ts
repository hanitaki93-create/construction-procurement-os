import type {
  MaterialRequisitionDetail,
  MrReviewDecision,
  ProcurementRoute,
  ReviewMaterialRequisitionRequest,
  SetProcurementRouteRequest,
} from '@cpos/contracts';
import type { DatabaseRuntime } from '@cpos/database-core';

import type { GovernedProcurementRequestContext } from './procurement.js';
import {
  procurementReviewPersistence,
  type ProcurementReviewPersistenceHandle,
  type ReviewTrailRow,
  type RouteDecisionRow,
} from './persistence/procurement-review.js';

const routeValues = new Set<ProcurementRoute>([
  'COMPETITIVE_RFQ',
  'DIRECT_ORDER',
  'PACKAGE_SOURCING',
  'SOLE_SOURCE_EXCEPTION',
  'EXTERNAL_ERP_STOCK',
]);

function transactionContext(context: GovernedProcurementRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function requireUuid(value: string, label: string): string {
  const normalized = value.trim();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(normalized)) {
    throw new Error(`${label} is invalid`);
  }
  return normalized;
}

function optionalText(value: string | undefined, max: number): string | null {
  if (value === undefined) return null;
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > max) throw new Error(`text exceeds ${max} characters`);
  return normalized;
}

function decimalMicros(value: string, label: string): bigint {
  const normalized = value.trim();
  const match = /^(\d+)(?:\.(\d{1,6}))?$/u.exec(normalized);
  if (!match) throw new Error(`${label} must be a non-negative exact decimal with at most 6 decimals`);
  const whole = BigInt(match[1] ?? '0');
  const fraction = BigInt((match[2] ?? '').padEnd(6, '0'));
  return whole * 1_000_000n + fraction;
}

function reviewTrail(row: ReviewTrailRow) {
  return {
    reviewOccurrenceId: row.review_occurrence_id,
    decision: row.decision,
    reviewerId: row.reviewer_id,
    reviewerName: row.reviewer_name,
    comments: row.comments,
    occurredAt: row.occurred_at,
  } as const;
}

function routeDecision(row: RouteDecisionRow) {
  return {
    routeDecisionId: row.route_decision_id,
    policyKey: row.policy_key,
    policyVersion: row.policy_version,
    route: row.route,
    justification: row.justification,
    decidedBy: row.decided_by,
    decidedByName: row.decided_by_name,
    decidedAt: row.decided_at,
  } as const;
}

export interface GovernedProcurementReviewRuntime {
  enrich(
    context: GovernedProcurementRequestContext,
    requisition: MaterialRequisitionDetail,
  ): Promise<MaterialRequisitionDetail>;
  review(
    context: GovernedProcurementRequestContext,
    mrId: string,
    request: ReviewMaterialRequisitionRequest,
  ): Promise<void>;
  setRoute(
    context: GovernedProcurementRequestContext,
    mrId: string,
    mrLineId: string,
    request: SetProcurementRouteRequest,
  ): Promise<void>;
}

export function createGovernedProcurementReviewRuntime(
  database: DatabaseRuntime,
): GovernedProcurementReviewRuntime {
  async function verifyAndUse<Result>(
    context: GovernedProcurementRequestContext,
    operationKey: string,
    callback: (handle: ProcurementReviewPersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: 'READ COMMITTED', logicalIdentity: context.invocationId },
      procurementReviewPersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
          throw new Error('verified authentication identity is not bound to this tenant principal');
        }
        return callback(handle);
      },
    );
  }

  return Object.freeze<GovernedProcurementReviewRuntime>({
    enrich: (context, requisition) =>
      verifyAndUse(context, 'procurement.mr.review-metadata.read.v1', async (handle) => {
        const [trailRows, routeRows] = await Promise.all([
          handle.reviewTrail(requisition.mrId),
          handle.currentRoutes(requisition.mrId),
        ]);
        const routesByLine = new Map(routeRows.map((row) => [row.mr_line_id, routeDecision(row)]));
        return {
          ...requisition,
          lines: requisition.lines.map((line) => ({
            ...line,
            routeDecision: routesByLine.get(line.mrLineId) ?? null,
          })),
          reviewTrail: trailRows.map(reviewTrail),
        };
      }),

    review: (context, rawMrId, request) => {
      const mrId = requireUuid(rawMrId, 'mrId');
      if (!Array.isArray(request.lineDecisions) || request.lineDecisions.length < 1) {
        throw new Error('lineDecisions must contain at least one line decision');
      }
      return verifyAndUse(context, 'procurement.mr.review.v1', async (handle) => {
        if (!(await handle.canReview())) throw new Error('not authorized to review Material/Purchase Requisitions');
        const mr = await handle.lockReviewableMr(mrId);
        if (mr === undefined) throw new Error('MR not found');
        if (!['SUBMITTED', 'UNDER_REVIEW'].includes(mr.status)) {
          throw new Error('MR review conflict: only a submitted requisition can be reviewed');
        }
        const lines = await handle.reviewableLines(mrId);
        if (lines.length < 1) throw new Error('MR review conflict: requisition has no lines');

        const requestedById = new Map(lines.map((line) => [line.mr_line_id, line]));
        const seen = new Set<string>();
        const normalized: Array<{
          readonly mrLineId: string;
          readonly outcome: 'APPROVED' | 'REJECTED';
          readonly approvedQuantity: string | null;
          readonly lineState: 'APPROVED' | 'PARTIALLY_APPROVED' | 'REJECTED';
        }> = [];

        for (const decision of request.lineDecisions) {
          const mrLineId = requireUuid(decision.mrLineId, 'mrLineId');
          if (seen.has(mrLineId)) throw new Error(`duplicate line decision for ${mrLineId}`);
          seen.add(mrLineId);
          const line = requestedById.get(mrLineId);
          if (line === undefined) throw new Error('line decision does not belong to this MR');
          if (decision.outcome !== 'APPROVED' && decision.outcome !== 'REJECTED') {
            throw new Error('line review outcome is invalid');
          }
          if (decision.outcome === 'REJECTED') {
            if (decision.approvedQuantity !== undefined && decimalMicros(decision.approvedQuantity, 'approvedQuantity') !== 0n) {
              throw new Error('rejected line cannot carry a positive approvedQuantity');
            }
            normalized.push({
              mrLineId,
              outcome: 'REJECTED',
              approvedQuantity: null,
              lineState: 'REJECTED',
            });
            continue;
          }

          const approvedQuantity = decision.approvedQuantity?.trim() || line.requested_quantity;
          const approved = decimalMicros(approvedQuantity, 'approvedQuantity');
          const requested = decimalMicros(line.requested_quantity, 'requestedQuantity');
          if (approved <= 0n || approved > requested) {
            throw new Error('approvedQuantity must be greater than zero and not exceed requested quantity');
          }
          normalized.push({
            mrLineId,
            outcome: 'APPROVED',
            approvedQuantity,
            lineState: approved === requested ? 'APPROVED' : 'PARTIALLY_APPROVED',
          });
        }

        if (seen.size !== lines.length) {
          throw new Error('review must contain exactly one decision for every MR line');
        }

        const allRejected = normalized.every((decision) => decision.lineState === 'REJECTED');
        const allFullyApproved = normalized.every((decision) => decision.lineState === 'APPROVED');
        const headerDecision: MrReviewDecision = allRejected
          ? 'REJECTED'
          : allFullyApproved
            ? 'APPROVED'
            : 'PARTIALLY_APPROVED';

        for (const decision of normalized) {
          if (!(await handle.applyLineDecision(decision))) {
            throw new Error('MR review conflict: a line changed while it was being reviewed');
          }
        }
        if (!(await handle.setMrReviewState(mrId, headerDecision))) {
          throw new Error('MR review conflict: requisition changed while it was being reviewed');
        }
        await handle.recordReview({
          mrId,
          reviewerId: context.principalId,
          decision: headerDecision,
          comments: optionalText(request.comments, 4000),
          lineDecisionsJson: JSON.stringify(normalized),
        });
      });
    },

    setRoute: (context, rawMrId, rawMrLineId, request) => {
      const mrId = requireUuid(rawMrId, 'mrId');
      const mrLineId = requireUuid(rawMrLineId, 'mrLineId');
      if (!routeValues.has(request.route)) throw new Error('procurement route is invalid');
      const justification = optionalText(request.justification, 4000);
      if (
        ['DIRECT_ORDER', 'SOLE_SOURCE_EXCEPTION', 'EXTERNAL_ERP_STOCK'].includes(request.route) &&
        (justification === null || justification.length < 10)
      ) {
        throw new Error('selected procurement route requires a justification of at least 10 characters');
      }
      return verifyAndUse(context, 'procurement.mr.line.route.v1', async (handle) => {
        if (!(await handle.canRoute())) throw new Error('not authorized to set procurement route');
        const line = await handle.lockApprovedLine(mrLineId);
        if (line === undefined || line.mr_id !== mrId) {
          throw new Error('approved MR line not found on this requisition');
        }
        await handle.setRoute({
          mrLineId,
          route: request.route,
          justification,
          decidedBy: context.principalId,
        });
      });
    },
  });
}
