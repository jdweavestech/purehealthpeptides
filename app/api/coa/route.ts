import { NextRequest, NextResponse } from 'next/server';
import { getCOA } from '@/lib/api/coa';

export async function GET(request: NextRequest) {
  const batchNumber = request.nextUrl.searchParams.get('batch_number');

  if (!batchNumber) {
    return NextResponse.json({ error: 'batch_number is required' }, { status: 400 });
  }

  const coa = await getCOA(batchNumber);

  if (!coa) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  return NextResponse.json(coa);
}
