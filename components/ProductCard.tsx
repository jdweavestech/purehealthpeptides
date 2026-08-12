import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { AddToCartButton } from './AddToCartButton';

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.basePrice;
  const categoryLabel = product.categorySlugs[0]?.replace(/-/g, ' ');

  return (
    <div className="product-card">
      <Link href={`/product/${product.slug}`} className="product-card__media">
        {product.images[0] && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 860px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        )}
        {product.stockStatus === 'low-stock' && (
          <span className="product-card__badge product-card__badge--stock">Low Stock</span>
        )}
        {product.stockStatus === 'out-of-stock' && (
          <span className="product-card__badge product-card__badge--stock">Sold Out</span>
        )}
      </Link>

      <div className="product-card__content">
        <span className="product-card__category">{categoryLabel}</span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <span className="product-card__format">{formatLabel(product.format)}</span>

        <div className="product-card__price-row">
          <span className="product-card__price">${product.basePrice.toFixed(2)}</span>
          {hasDiscount && (
            <span className="product-card__price--compare">
              ${product.compareAtPrice!.toFixed(2)}
            </span>
          )}
        </div>
        <span className="product-card__discount-note">Save up to 15% on 15+ vials</span>

        <div className="product-card__actions">
          <AddToCartButton product={product} variation={product.variations[0]} compact />
          <Link href={`/product/${product.slug}`} className="btn btn--secondary btn--sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatLabel(format: Product['format']) {
  switch (format) {
    case 'vial': return 'Vial';
    case 'capsule': return 'Capsules';
    case 'liquid': return 'Liquid Solution';
    case 'topical': return 'Topical';
  }
}
