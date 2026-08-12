'use client';

import { useMemo, useState } from 'react';
import type { ProductInfoCard, Category } from '@/lib/types';
import { DocumentIcon } from './icons';
import { EmptyState } from './EmptyState';

export function InfoCardLibrary({
  cards,
  categories,
}: {
  cards: ProductInfoCard[];
  categories: Category[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      const matchesQuery = card.productName.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? card.categorySlug === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [cards, query, category]);

  return (
    <div>
      <div className="shop-toolbar">
        <input
          className="input"
          placeholder="Search product info cards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No info cards match your search" description="Try a different product name or category." />
      ) : (
        <div className="info-card-grid">
          {filtered.map((card) => (
            <div className="info-card" key={card.id}>
              <DocumentIcon width={24} height={24} style={{ color: 'var(--color-accent)' }} />
              <div className="info-card__name">{card.productName}</div>
              <div className="info-card__format">{card.format}</div>
              <a href={card.downloadUrl} className="btn btn--secondary btn--sm">
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
