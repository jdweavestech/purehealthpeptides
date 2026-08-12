'use client';

import type { Product, ProductVariation } from '@/lib/types';
import { useCart } from '@/lib/cart/cart-context';

interface Props {
  product: Product;
  variation: ProductVariation;
  quantity?: number;
  compact?: boolean;
}

export function AddToCartButton({ product, variation, quantity = 1, compact }: Props) {
  const { addItem } = useCart();
  const soldOut = variation.stockStatus === 'out-of-stock';

  return (
    <button
      type="button"
      className={`btn btn--primary ${compact ? 'btn--sm' : ''}`}
      disabled={soldOut}
      onClick={() => addItem(product, variation, quantity)}
    >
      {soldOut ? 'Sold Out' : 'Add to Cart'}
    </button>
  );
}
