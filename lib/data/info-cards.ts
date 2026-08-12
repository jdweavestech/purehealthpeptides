import type { ProductInfoCard } from '@/lib/types';
import { products } from './products';

export const infoCards: ProductInfoCard[] = products.map((p) => ({
  id: p.infoCardId ?? `ic-${p.slug}`,
  productSlug: p.slug,
  productName: p.name,
  format: p.format,
  categorySlug: p.categorySlugs[0],
  downloadUrl: `/mock-documents/info-card-${p.slug}.pdf`,
}));

export function getProductInfoCard(slug: string): ProductInfoCard | undefined {
  return infoCards.find((c) => c.productSlug === slug);
}

export function getAllInfoCards(): ProductInfoCard[] {
  return infoCards;
}
