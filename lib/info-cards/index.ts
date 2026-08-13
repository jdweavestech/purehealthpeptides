/**
 * Product Info Cards data-access layer — the ONLY module pages/components
 * should import info-card data from.
 *
 * Status: MOCK DATA ONLY. The Next.js build was failing with
 * `Site API error 404 on /info-cards: rest_no_route` because this data
 * used to be fetched from the site's custom REST route
 * (GET /wp-json/php/v1/info-cards, see
 * /wordpress-integration/pure-health-peptides-api.php). That PHP is
 * written but has not been installed/activated on the live WordPress
 * site yet, so the route doesn't exist and every request 404s.
 *
 * Per project instructions, we are not inventing a new WordPress
 * endpoint and not touching the WordPress backend just to unblock this
 * build. Until the `php/v1` plugin above is deployed, this module serves
 * the centralized local mock data from `lib/data/info-cards.ts` (the
 * same Phase 1 mock data source `lib/api/products.ts` falls back to)
 * behind this interface instead. When the endpoint is live, swap the
 * bodies below for a `wpFetch` call — the same pattern `lib/api/coa.ts`
 * already uses for the sibling `/coa` route — callers do not need to
 * change.
 */
import type { ProductInfoCard } from '@/lib/types';
import { getAllInfoCards, getProductInfoCard } from '@/lib/data';

export async function getInfoCards(): Promise<ProductInfoCard[]> {
  return getAllInfoCards();
}

export async function getInfoCardBySlug(slug: string): Promise<ProductInfoCard | undefined> {
  return getProductInfoCard(slug);
}
