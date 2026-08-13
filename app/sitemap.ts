import type { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/api/products';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://purehealthpeptides.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

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
