import type { Product, ProductVariation, ProductFormat, StockStatus, Category } from '@/lib/types';
import type { WooProduct, WooProductVariation, WooCategory } from './woo-types';
import { toProxiedImageUrl } from './image-proxy';

/**
 * Meta keys this mapper looks for on the WooCommerce product.
 * Expose these via ACF ("Show in REST API" enabled) or
 * register_post_meta(..., ['show_in_rest' => true]) so they appear in
 * the product's `meta_data` array. All are optional — the mapper falls
 * back gracefully if a key is missing.
 */
const META_KEYS = {
  researchApplications: 'research_applications', // comma-separated string
  specifications: 'specifications', // JSON string: [{ "label": "...", "value": "..." }]
  coaId: 'coa_id', // links to a COA custom-post-type entry
  infoCardId: 'info_card_id', // links to an info-card custom-post-type entry
  format: 'pa_format', // product attribute slug for Vial / Capsule / Liquid / Topical
} as const;

function mapStockStatus(status: WooProduct['stock_status']): StockStatus {
  if (status === 'outofstock') return 'out-of-stock';
  if (status === 'onbackorder') return 'low-stock';
  return 'in-stock';
}

function mapFormat(woo: WooProduct): ProductFormat {
  const attr = woo.attributes.find((a) => a.name.toLowerCase() === 'format');
  const raw = attr?.options[0]?.toLowerCase() ?? '';
  if (raw.includes('capsule')) return 'capsule';
  if (raw.includes('liquid')) return 'liquid';
  if (raw.includes('topical')) return 'topical';
  return 'vial';
}

function readMeta(woo: WooProduct, key: string): string | undefined {
  return woo.meta_data.find((m) => m.key === key)?.value as string | undefined;
}

function mapSpecifications(woo: WooProduct): { label: string; value: string }[] {
  const raw = readMeta(woo, META_KEYS.specifications);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapResearchApplications(woo: WooProduct): string[] {
  const raw = readMeta(woo, META_KEYS.researchApplications);
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

export function mapWooProductVariation(v: WooProductVariation): ProductVariation {
  const label = v.attributes.map((a) => a.option).join(' / ') || v.sku;
  return {
    id: String(v.id),
    label,
    price: Number(v.price),
    sku: v.sku,
    stockStatus: mapStockStatus(v.stock_status),
  };
}

export function mapWooProduct(woo: WooProduct, variations: WooProductVariation[] = []): Product {
  const mappedVariations =
    variations.length > 0
      ? variations.map(mapWooProductVariation)
      : [
          {
            id: String(woo.id),
            label: 'Default',
            price: Number(woo.price || woo.regular_price || 0),
            sku: String(woo.id),
            stockStatus: mapStockStatus(woo.stock_status),
          },
        ];

  return {
    id: String(woo.id),
    slug: woo.slug,
    name: woo.name,
    shortDescription: stripHtml(woo.short_description),
    description: stripHtml(woo.description),
    categorySlugs: woo.categories.map((c) => c.slug),
    format: mapFormat(woo),
    images: woo.images.map((img) => ({ url: toProxiedImageUrl(img.src), alt: img.alt || woo.name })),
    variations: mappedVariations,
    hasVariations: woo.type === 'variable',
    basePrice: Number(woo.price || mappedVariations[0]?.price || 0),
    compareAtPrice: woo.regular_price && woo.regular_price !== woo.price ? Number(woo.regular_price) : undefined,
    stockStatus: mapStockStatus(woo.stock_status),
    featured: woo.featured,
    researchApplications: mapResearchApplications(woo),
    specifications: mapSpecifications(woo),
    coaId: readMeta(woo, META_KEYS.coaId),
    infoCardId: readMeta(woo, META_KEYS.infoCardId),
  };
}

export function mapWooCategory(woo: WooCategory): Category {
  return {
    id: String(woo.id),
    slug: woo.slug,
    name: woo.name,
    shortDescription: stripHtml(woo.description),
    image: woo.image?.src ? toProxiedImageUrl(woo.image.src) : '',
    productCount: woo.count,
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
