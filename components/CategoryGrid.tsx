import Link from 'next/link';
import type { Category } from '@/lib/types';

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <Link href={`/shop/${cat.slug}`} className="category-card" key={cat.id}>
          <img src={cat.image} alt="" />
          <div className="category-card__content">
            <div className="category-card__name">{cat.name}</div>
            <div className="category-card__desc">{cat.shortDescription}</div>
            <div className="category-card__count">{cat.productCount} products</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
