import type { COA } from '@/lib/types';
import { wpFetch, isWooConfigured } from './woocommerce-client';
import { getCOAByBatchNumber as getMockCOAByBatchNumber } from '@/lib/data';

interface WpCoaResponse {
  batch_number: string;
  product_name: string;
  purity_percent: number;
  testing_date: string;
  laboratory: string;
  download_url: string;
}

function mapWpCoa(raw: WpCoaResponse): COA {
  return {
    id: raw.batch_number,
    batchNumber: raw.batch_number,
    productName: raw.product_name,
    purityPercent: raw.purity_percent,
    testingDate: raw.testing_date,
    laboratory: raw.laboratory,
    downloadUrl: raw.download_url,
  };
}

/**
 * Looks up a COA by batch number via the site's custom REST route
 * (GET /wp-json/php/v1/coa?batch_number=...) — see
 * /wordpress-integration/pure-health-peptides-api.php for the
 * WordPress side that registers this endpoint and its custom post type.
 */
export async function getCOA(batchNumber: string): Promise<COA | undefined> {
  if (!isWooConfigured()) return getMockCOAByBatchNumber(batchNumber);

  try {
    const result = await wpFetch<WpCoaResponse | null>(
      '/coa',
      { batch_number: batchNumber },
      { revalidate: 60 }
    );
    return result ? mapWpCoa(result) : undefined;
  } catch (err) {
    // A 404 from the custom endpoint means "not found" — not an error state.
    if (err instanceof Error && err.message.includes('404')) return undefined;
    throw err;
  }
}
