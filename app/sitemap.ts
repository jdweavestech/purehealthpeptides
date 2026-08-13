import type { MetadataRoute } from 'next';
import { getProductSlugs, getCategories } from '@/lib/api/products';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://purehealthpeptides.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only slugs are needed to build product URLs — same lightweight fetch
  // generateStaticParams() uses, so the build doesn't pull the full
  // catalog (with descriptions/images/metadata) a second time.
  const [products, categories] = await Promise.all([getProductSlugs(), getCategories()]);

  const staticRoutes = ['', '/shop', '/coa-verification', '/info-cards', '/faq', '/about', '/shipping', '/contact'].map(
    (path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() })
  );

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/shop/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
