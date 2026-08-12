import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShopFilters } from '@/components/ShopFilters';
import { ShopSort } from '@/components/ShopSort';
import { SearchBar } from '@/components/SearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductGridSkeleton } from '@/components/LoadingSkeleton';
import { getFilteredProducts, getCategories } from '@/lib/api/products';
import type { ProductFilters } from '@/lib/api/products';

export const metadata: Metadata = {
  title: 'Shop Research Peptides',
  description: 'Browse the full Pure Health Peptides research catalog, filterable by category and format.',
};

interface Props {
  searchParams: { category?: string; format?: string; q?: string; sort?: string };
}

export default async function ShopPage({ searchParams }: Props) {
  const filters: ProductFilters = {
    category: searchParams.category,
    format: searchParams.format,
    search: searchParams.q,
    sort: (searchParams.sort as ProductFilters['sort']) ?? 'featured',
  };

  const [products, categories] = await Promise.all([
    getFilteredProducts(filters),
    getCategories(),
  ]);

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />
      <div className="section-heading">
        <span className="eyebrow">Full Catalog</span>
        <h1 className="section-heading__title">Shop Research Peptides</h1>
      </div>

      <div className="shop-layout">
        <Suspense>
          <ShopFilters categories={categories} />
        </Suspense>

        <div>
          <div className="shop-toolbar">
            <Suspense>
              <SearchBar />
            </Suspense>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <span className="shop-toolbar__count">{products.length} products</span>
              <Suspense>
                <ShopSort />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
