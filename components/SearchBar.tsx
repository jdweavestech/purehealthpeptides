'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchIcon } from './icons';

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 'var(--spacing-2xs)', flex: 1, maxWidth: 360 }}>
      <label htmlFor="shop-search" className="visually-hidden">
        Search products
      </label>
      <input
        id="shop-search"
        type="search"
        className="input"
        placeholder="Search peptides..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="icon-btn" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  );
}
