import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { TrustSection } from '@/components/TrustSection';
import { PricingBand } from '@/components/PricingBand';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryGrid } from '@/components/CategoryGrid';
import { getFeaturedProducts, getCategories } from '@/lib/api/products';

export const metadata: Metadata = {
  title: 'Pure Health Peptides — Research-Grade Peptides, Independently Tested',
};

export default async function HomePage() {
  const [featured, categories] = await Promise.all([getFeaturedProducts(), getCategories()]);

  return (
    <>
      <Hero />
      <TrustSection />
      <PricingBand />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Featured</span>
            <h2 className="section-heading__title">Featured Research Peptides</h2>
            <p className="section-heading__desc">
              A selection of our most-referenced compounds, each shipped with
              a batch-specific certificate of analysis.
            </p>
          </div>
          <ProductGrid products={featured} />
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
            <Link href="/shop" className="btn btn--secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Browse by Research Area</span>
            <h2 className="section-heading__title">Research Categories</h2>
            <p className="section-heading__desc">
              Compounds organized by the research areas they're most
              frequently referenced in. For laboratory research use only.
            </p>
          </div>
          <CategoryGrid categories={categories} />
        </div>
      </section>
    </>
  );
}
