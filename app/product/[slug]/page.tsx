import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductPurchasePanel } from '@/components/ProductPurchasePanel';
import { ProductTabs } from '@/components/ProductTabs';
import { ProductGrid } from '@/components/ProductGrid';
import { getProductBySlug, getProductSlugs, getRelatedProducts } from '@/lib/api/products';
import { getCOA } from '@/lib/api/coa';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // Lightweight id/slug-only fetch — this must NOT pull the full catalog
  // (descriptions, images, meta_data, ...), since that's what produced the
  // >2MB response the Next.js Data Cache refused to store during build.
  const products = await getProductSlugs();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const coa = product.coaId ? await getCOA(product.coaId) : undefined;
  const related = await getRelatedProducts(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => i.url),
    offers: {
      '@type': 'Offer',
      price: product.basePrice,
      priceCurrency: 'USD',
      availability:
        product.stockStatus === 'out-of-stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
  };

  return (
    <div className="container section">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: product.name },
        ]}
      />

      <div className="product-detail">
        <ProductGallery images={product.images} productName={product.name} />
        <div>
          <div className="product-info__category">{product.categorySlugs[0]?.replace(/-/g, ' ')}</div>
          <h1 className="product-info__name">{product.name}</h1>
          <p className="product-info__summary">{product.shortDescription}</p>
          <ProductPurchasePanel product={product} />
        </div>
      </div>

      <ProductTabs product={product} coa={coa} />

      {related.length > 0 && (
        <section style={{ marginTop: 'var(--spacing-2xl)' }}>
          <div className="section-heading">
            <h2 className="section-heading__title">Related Research Compounds</h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
