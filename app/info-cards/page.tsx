import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { InfoCardLibrary } from '@/components/InfoCardLibrary';
import { getInfoCards } from '@/lib/info-cards';
import { getCategories } from '@/lib/api/products';

export const metadata: Metadata = {
  title: 'Product Info Cards',
  description: 'Searchable library of product information cards for every Pure Health Peptides compound.',
};

export default async function InfoCardsPage() {
  const [cards, categories] = await Promise.all([getInfoCards(), getCategories()]);

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Product Info Cards' }]} />
      <div className="section-heading">
        <span className="eyebrow">Documentation</span>
        <h1 className="section-heading__title">Product Information Cards</h1>
      </div>
      <InfoCardLibrary cards={cards} categories={categories} />
    </div>
  );
}
