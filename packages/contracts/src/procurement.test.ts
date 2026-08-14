import { describe, expect, it } from 'vitest';

import type { MaterialRequisitionDetail } from './procurement.js';

describe('Material Requisition contract', () => {
  it('keeps quantities on lines instead of inventing a mixed-UOM header total', () => {
    const requisition: MaterialRequisitionDetail = {
      mrId: '018f0000-0000-7000-8000-000000000001',
      mrNumber: 'MR-UAQ-26-00001',
      projectId: '018f0000-0000-7000-8000-000000000002',
      projectCode: 'UAQ',
      projectName: 'UAQ Villa',
      requesterId: '018f0000-0000-7000-8000-000000000003',
      requesterName: 'Buyer',
      requestDate: '2026-08-14',
      requiredOnSiteDate: '2026-08-30',
      priority: 'NORMAL',
      subject: 'Mixed materials',
      status: 'DRAFT',
      submittedAt: null,
      lineCount: 2,
      requesterTeam: null,
      deliveryLocationId: null,
      instructions: null,
      lines: [
        {
          mrLineId: '018f0000-0000-7000-8000-000000000004',
          lineNo: 10,
          entryMode: 'FREE_FORM',
          itemId: null,
          lineType: 'MATERIAL',
          description: 'Cement',
          specification: null,
          requestedQuantity: '50',
          uomCode: 'KG',
          requiredDateOverride: null,
          manufacturer: null,
          brand: null,
          model: null,
          equivalentRule: 'ALTERNATE_BY_APPROVAL',
          preferredSupplierId: null,
          technicalNotes: null,
          approvedQuantity: null,
          lineState: 'DRAFT',
        },
        {
          mrLineId: '018f0000-0000-7000-8000-000000000005',
          lineNo: 20,
          entryMode: 'FREE_FORM',
          itemId: null,
          lineType: 'MATERIAL',
          description: 'Door closer',
          specification: null,
          requestedQuantity: '12',
          uomCode: 'EA',
          requiredDateOverride: null,
          manufacturer: null,
          brand: null,
          model: null,
          equivalentRule: 'ALTERNATE_BY_APPROVAL',
          preferredSupplierId: null,
          technicalNotes: null,
          approvedQuantity: null,
          lineState: 'DRAFT',
        },
      ],
    };

    expect(requisition.lineCount).toBe(2);
    expect(requisition.lines.map((line) => `${line.requestedQuantity} ${line.uomCode}`)).toEqual([
      '50 KG',
      '12 EA',
    ]);
    expect('totalRequestedQuantity' in requisition).toBe(false);
  });
});
