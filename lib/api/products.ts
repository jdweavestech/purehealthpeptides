/**
 * Product data-access layer — the ONLY module pages/components should
 * import product/category data from. Backed by the live WooCommerce
 * REST API; falls back to local mock data only if WooCommerce
 * credentials aren't configured, so the site still runs in local dev
 * without a .env.local file.
 */
import type { Product, Category } from '@/lib/types';
import { wooFetch, isWooConfigured } from './woocommerce-client';
import { mapWooProduct, mapWooCategory } from './mappers/product-mapper';
import type { WooProduct, WooProductVariation, WooCategory } from './mappers/woo-types';
import {
  getProducts as getMockProducts,
  getProductBySlug as getMockProductBySlug,
  getFeaturedProducts as getMockFeaturedProducts,
  getFilteredProducts as getMockFilteredProducts,
  getCategories as getMockCategories,
  getCategoryBySlug as getMockCategoryBySlug,
} from '@/lib/data';

async function fetchVariationsIfVariable(woo: WooProduct): Promise<WooProductVariation[]> {
  if (woo.type !== 'variable') return [];
  return wooFetch<WooProductVariation[]>(`/products/${woo.id}/variations`, { per_page: 100 });
}

/**
 * Requesting the whole catalog in one `per_page=100` call is what
 * produced the >2MB response the Next.js Data Cache refused to store
 * ("items over 2MB can not be cached"). Full WooCommerce product objects
 * (description, images, meta_data, attributes, ...) run tens of KB each,
 * so 100 of them at once blows past the limit. Paginating in smaller
 * batches keeps every individual request — and therefore every
 * individual cache entry — comfortably under 2MB while still returning
 * the full result set to the caller.
 */
async function fetchAllWooPages<T>(
  path: string,
  params: Record<string, string | number | boolean>,
  perPage: number
): Promise<T[]> {
  const results: T[] = [];
  let page = 1;
  // Safety cap so an unexpected API response can't loop forever.
  for (let i = 0; i < 200; i++) {
    const batch = await wooFetch<T[]>(path, { ...params, per_page: perPage, page });
    results.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }
  return results;
}

/** Page size for full-product listing requests — small enough that a page
 *  of full product objects stays well under the 2MB Next.js data cache
 *  limit even for a catalog with unusually large descriptions/images. */
const LISTING_PAGE_SIZE = 20;

/** Page size for the id/slug-only lookup used by generateStaticParams().
 *  Each item is a few bytes, so the 2MB ceiling isn't a concern here —
 *  100 is WooCommerce's own per_page maximum, minimizing request count. */
const SLUG_PAGE_SIZE = 100;

export async function getProducts(): Promise<Product[]> {
  if (!isWooConfigured()) return getMockProducts();

  // Listing-only fetch: no per-product variations request. WooCommerce
  // already returns a representative `price` on the parent product for
  // variable products, which is all the grid needs — see hasVariations
  // on Product for how the UI knows to defer to the product page instead
  // of guessing a variation id.
  const wooProducts = await fetchAllWooPages<WooProduct>('/products', { status: 'publish' }, LISTING_PAGE_SIZE);
  return wooProducts.map((wp) => mapWooProduct(wp));
}

export interface ProductStub {
  id: string;
  slug: string;
}

/**
 * Cheapest possible product listing: just `id` + `slug`, nothing else.
 * Used by generateStaticParams() (and the sitemap) where the only thing
 * needed is "which routes exist" — not descriptions, images, or metadata.
 * Uses WooCommerce's `_fields` param so the API itself never sends the
 * heavy fields over the wire, and pages through the catalog so it still
 * returns every product regardless of catalog size (WooCommerce caps
 * per_page at 100).
 */
export async function getProductSlugs(): Promise<ProductStub[]> {
  if (!isWooConfigured()) return getMockProducts().map((p) => ({ id: p.id, slug: p.slug }));

  const wooProducts = await fetchAllWooPages<{ id: number; slug: string }>(
    '/products',
    { status: 'publish', _fields: 'id,slug' },
    SLUG_PAGE_SIZE
  );
  return wooProducts.map((wp) => ({ id: String(wp.id), slug: wp.slug }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isWooConfigured()) return getMockFeaturedProducts();

  const wooProducts = await wooFetch<WooProduct[]>('/products', {
    status: 'publish',
    featured: true,
    per_page: 12,
  });
  return wooProducts.map((wp) => mapWooProduct(wp));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isWooConfigured()) return getMockProductBySlug(slug);

  const matches = await wooFetch<WooProduct[]>('/products', { slug, status: 'publish' });
  const wp = matches[0];
  if (!wp) return undefined;

  return mapWooProduct(wp, await fetchVariationsIfVariable(wp));
}

export interface ProductFilters {
  category?: string;
  /** Resolved WooCommerce category id, if the caller already has it (e.g.
   *  from a getCategories()/getCategoryBySlug() call it made anyway) —
   *  skips the extra /products/categories lookup this function would
   *  otherwise do to turn `category` (a slug) into an id. */
  categoryId?: string | number;
  format?: string;
  search?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
}

export async function getFilteredProducts(filters: ProductFilters): Promise<Product[]> {
  if (!isWooConfigured()) return getMockFilteredProducts(filters);

  const params: Record<string, string | number> = { status: 'publish' };

  if (filters.categoryId) {
    params.category = filters.categoryId;
  } else if (filters.category) {
    const [category] = await wooFetch<WooCategory[]>('/products/categories', { slug: filters.category });
    if (category) params.category = category.id;
  }
  if (filters.search) params.search = filters.search;

  switch (filters.sort) {
    case 'price-asc':
      params.orderby = 'price';
      params.order = 'asc';
      break;
    case 'price-desc':
      params.orderby = 'price';
      params.order = 'desc';
      break;
    case 'name-asc':
      params.orderby = 'title';
      params.order = 'asc';
      break;
    default:
      params.orderby = 'menu_order';
  }

  const wooProducts = await fetchAllWooPages<WooProduct>('/products', params, LISTING_PAGE_SIZE);
  let products = wooProducts.map((wp) => mapWooProduct(wp));

  // WooCommerce attributes (format) aren't filterable via the core query params
  // used above, so format is filtered client-side after mapping.
  if (filters.format) {
    products = products.filter((p) => p.format === filters.format);
  }
  if (filters.sort === 'featured' || !filters.sort) {
    products = [...products].sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return products;
}

/**
 * Fetches a handful of products in the same category as `product`, for the
 * "Related Research Compounds" section on the product detail page. Scoped
 * directly to that one category instead of pulling the whole catalog (as
 * getProducts() would) and filtering client-side — that pattern was the
 * single biggest contributor to slow product-page loads, since it also
 * pulled every variable product's variations along with it.
 */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!isWooConfigured()) {
    return getMockProducts()
      .filter((p) => p.id !== product.id && p.categorySlugs.some((c) => product.categorySlugs.includes(c)))
      .slice(0, limit);
  }

  const primarySlug = product.categorySlugs[0];
  if (!primarySlug) return [];

  const [category] = await wooFetch<WooCategory[]>('/products/categories', { slug: primarySlug });
  if (!category) return [];

  const wooProducts = await wooFetch<WooProduct[]>('/products', {
    status: 'publish',
    category: category.id,
    exclude: product.id,
    per_page: limit,
  });

  return wooProducts.map((wp) => mapWooProduct(wp));
}

export async function getCategories(): Promise<Category[]> {
  if (!isWooConfigured()) return getMockCategories();

  const wooCategories = await wooFetch<WooCategory[]>('/products/categories', {
    per_page: 100,
    hide_empty: false,
  });
  return wooCategories.filter((c) => c.slug !== 'uncategorized').map(mapWooCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  if (!isWooConfigured()) return getMockCategoryBySlug(slug);

  const matches = await wooFetch<WooCategory[]>('/products/categories', { slug });
  return matches[0] ? mapWooCategory(matches[0]) : undefined;
}
