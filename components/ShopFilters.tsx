'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Category } from '@/lib/types';
import { CloseIcon } from './icons';

const FORMATS: { value: string; label: string }[] = [
  { value: 'vial', label: 'Vials' },
  { value: 'capsule', label: 'Capsules' },
  { value: 'liquid', label: 'Liquids' },
  { value: 'topical', label: 'Topicals' },
];

export function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCategory = searchParams.get('category') ?? '';
  const activeFormat = searchParams.get('format') ?? '';

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }

  const content = (
    <>
      <div className="filter-group">
        <div className="filter-group__title">Research Category</div>
        <div className="filter-group__options">
          <label className="filter-option">
            <span>
              <input
                type="radio"
                name="category"
                checked={activeCategory === ''}
                onChange={() => updateParam('category', '')}
              />{' '}
              All Categories
            </span>
          </label>
          {categories.map((cat) => (
            <label className="filter-option" key={cat.id}>
              <span>
                <input
                  type="radio"
                  name="category"
                  checked={activeCategory === cat.slug}
                  onChange={() => updateParam('category', cat.slug)}
                />{' '}
                {cat.name}
              </span>
              <span className="filter-option__count">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Format</div>
        <div className="filter-group__options">
          <label className="filter-option">
            <span>
              <input
                type="radio"
                name="format"
                checked={activeFormat === ''}
                onChange={() => updateParam('format', '')}
              />{' '}
              All Formats
            </span>
          </label>
          {FORMATS.map((f) => (
            <label className="filter-option" key={f.value}>
              <span>
                <input
                  type="radio"
                  name="format"
                  checked={activeFormat === f.value}
                  onChange={() => updateParam('format', f.value)}
                />{' '}
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="btn btn--secondary mobile-filter-trigger"
        onClick={() => setMobileOpen(true)}
      >
        Filters
      </button>

      <aside className="shop-filters" aria-label="Product filters">
        {content}
      </aside>

      {mobileOpen && (
        <>
          <div className="cart-drawer-overlay" onClick={() => setMobileOpen(false)} />
          <aside className="shop-filters" style={{ display: 'flex' }} aria-label="Product filters">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Filters</h3>
              <button type="button" className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Close filters">
                <CloseIcon />
              </button>
            </div>
            {content}
          </aside>
        </>
      )}
    </>
  );
}
