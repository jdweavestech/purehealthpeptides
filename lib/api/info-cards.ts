import type { ProductInfoCard } from '@/lib/types';
import { wpFetch, isWooConfigured } from './woocommerce-client';
import { getAllInfoCards, getProductInfoCard as getMockInfoCard } from '@/lib/data';

interface WpInfoCardResponse {
  product_slug: string;
  product_name: string;
  format: string;
  category_slug: string;
  download_url: string;
}

function mapWpInfoCard(raw: WpInfoCardResponse): ProductInfoCard {
  return {
    id: raw.product_slug,
    productSlug: raw.product_slug,
    productName: raw.product_name,
    format: raw.format,
    categorySlug: raw.category_slug,
    downloadUrl: raw.download_url,
  };
}

/**
 * Lists all product info cards via the site's custom REST route
 * (GET /wp-json/php/v1/info-cards) — see
 * /wordpress-integration/pure-health-peptides-api.php.
 */
export async function getInfoCards(): Promise<ProductInfoCard[]> {
  if (!isWooConfigured()) return getAllInfoCards();

  const results = await wpFetch<WpInfoCardResponse[]>('/info-cards', { per_page: 100 });
  return results.map(mapWpInfoCard);
}

export async function getProductInfoCard(slug: string): Promise<ProductInfoCard | undefined> {
  if (!isWooConfigured()) return getMockInfoCard(slug);

  try {
    const result = await wpFetch<WpInfoCardResponse | null>(`/info-cards/${slug}`);
    return result ? mapWpInfoCard(result) : undefined;
  } catch (err) {
    if (err instanceof Error && err.message.includes('404')) return undefined;
    throw err;
  }
}
