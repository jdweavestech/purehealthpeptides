import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGrid } from '@/components/ProductGrid';
import { getCategoryBySlug, getCategories, getFilteredProducts } from '@/lib/api/products';

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.shortDescription,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.category);
  if (!category) notFound();

  const products = await getFilteredProducts({ category: category.slug });

  return (
    <div className="container section">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: category.name }]}
      />
      <div className="section-heading">
        <span className="eyebrow">Research Category</span>
        <h1 className="section-heading__title">{category.name}</h1>
        <p className="section-heading__desc">{category.shortDescription}</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
