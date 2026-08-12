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
  type ProductFilters,
} from '@/lib/data';

async function fetchVariationsIfVariable(woo: WooProduct): Promise<WooProductVariation[]> {
  if (woo.type !== 'variable') return [];
  return wooFetch<WooProductVariation[]>(`/products/${woo.id}/variations`, { per_page: 100 });
}

export async function getProducts(): Promise<Product[]> {
  if (!isWooConfigured()) return getMockProducts();

  const wooProducts = await wooFetch<WooProduct[]>('/products', { status: 'publish', per_page: 100 });
  return Promise.all(
    wooProducts.map(async (wp) => mapWooProduct(wp, await fetchVariationsIfVariable(wp)))
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isWooConfigured()) return getMockFeaturedProducts();

  const wooProducts = await wooFetch<WooProduct[]>('/products', {
    status: 'publish',
    featured: true,
    per_page: 12,
  });
  return Promise.all(
    wooProducts.map(async (wp) => mapWooProduct(wp, await fetchVariationsIfVariable(wp)))
  );
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isWooConfigured()) return getMockProductBySlug(slug);

  const matches = await wooFetch<WooProduct[]>('/products', { slug, status: 'publish' });
  const wp = matches[0];
  if (!wp) return undefined;

  return mapWooProduct(wp, await fetchVariationsIfVariable(wp));
}

export async function getFilteredProducts(filters: ProductFilters): Promise<Product[]> {
  if (!isWooConfigured()) return getMockFilteredProducts(filters);

  const params: Record<string, string | number> = { status: 'publish', per_page: 100 };

  if (filters.category) {
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

  const wooProducts = await wooFetch<WooProduct[]>('/products', params);
  let products = await Promise.all(
    wooProducts.map(async (wp) => mapWooProduct(wp, await fetchVariationsIfVariable(wp)))
  );

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

export type { ProductFilters };
