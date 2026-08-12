'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function ShopSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? 'featured';

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className="select"
      value={sort}
      onChange={(e) => handleChange(e.target.value)}
      style={{ width: 'auto' }}
      aria-label="Sort products"
    >
      <option value="featured">Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A–Z</option>
    </select>
  );
}
