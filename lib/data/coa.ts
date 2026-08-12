import type { COA } from '@/lib/types';

export const coaRecords: COA[] = [
  { id: 'coa-bpc157-2406', batchNumber: 'BPC157-2406A', productName: 'BPC-157', purityPercent: 99.3, testingDate: '2026-06-12', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-bpc157-2406a.pdf' },
  { id: 'coa-tb500-2406', batchNumber: 'TB500-2406B', productName: 'TB-500', purityPercent: 99.1, testingDate: '2026-06-10', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-tb500-2406b.pdf' },
  { id: 'coa-cjc1295-2406', batchNumber: 'CJC1295-2406A', productName: 'CJC-1295', purityPercent: 98.7, testingDate: '2026-06-08', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-cjc1295-2406a.pdf' },
  { id: 'coa-aod9604-2406', batchNumber: 'AOD9604-2406A', productName: 'AOD-9604', purityPercent: 98.4, testingDate: '2026-06-05', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-aod9604-2406a.pdf' },
  { id: 'coa-aicar-2406', batchNumber: 'AICAR-2406A', productName: 'AICAR', purityPercent: 98.9, testingDate: '2026-06-03', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-aicar-2406a.pdf' },
  { id: 'coa-5amino-2406', batchNumber: '5A1MQ-2406A', productName: '5-Amino-1MQ', purityPercent: 99.0, testingDate: '2026-05-29', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-5amino-2406a.pdf' },
  { id: 'coa-ghkcu-2406', batchNumber: 'GHKCU-2406A', productName: 'GHK-Cu', purityPercent: 99.2, testingDate: '2026-05-27', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-ghkcu-2406a.pdf' },
  { id: 'coa-selank-2406', batchNumber: 'SELANK-2406A', productName: 'Selank', purityPercent: 98.6, testingDate: '2026-05-22', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-selank-2406a.pdf' },
  { id: 'coa-epithalon-2406', batchNumber: 'EPITHALON-2406A', productName: 'Epithalon', purityPercent: 99.4, testingDate: '2026-05-20', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-epithalon-2406a.pdf' },
  { id: 'coa-bacwater-2406', batchNumber: 'BACWATER-2406A', productName: 'Bacteriostatic Water', purityPercent: 100, testingDate: '2026-05-18', laboratory: 'Janoshik Analytical', downloadUrl: '/mock-documents/coa-bacwater-2406a.pdf' },
];

export function getCOA(): COA[] {
  return coaRecords;
}

export function getCOAByBatchNumber(batchNumber: string): COA | undefined {
  const normalized = batchNumber.trim().toLowerCase();
  return coaRecords.find((c) => c.batchNumber.toLowerCase() === normalized);
}
