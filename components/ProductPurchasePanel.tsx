'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart/cart-context';
import { BULK_TIERS, getDiscountedUnitPrice, getTierForQuantity } from '@/lib/pricing/bulk-pricing';

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variationId, setVariationId] = useState(product.variations[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const variation = product.variations.find((v) => v.id === variationId) ?? product.variations[0];
  const soldOut = variation?.stockStatus === 'out-of-stock';

  const unitPrice = variation?.price ?? product.basePrice;
  const discountedUnitPrice = useMemo(() => getDiscountedUnitPrice(unitPrice, quantity), [unitPrice, quantity]);
  const activeTier = useMemo(() => getTierForQuantity(quantity), [quantity]);

  return (
    <div>
      <div className="product-info__price-row">
        <span className="product-info__price">${discountedUnitPrice.toFixed(2)}</span>
        {discountedUnitPrice < unitPrice && (
          <span className="product-info__price--compare">${unitPrice.toFixed(2)}</span>
        )}
      </div>

      {product.variations.length > 1 && (
        <div className="option-group">
          <div className="option-group__label">Format / Strength</div>
          <div className="option-swatches">
            {product.variations.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`option-swatch ${v.id === variationId ? 'option-swatch--active' : ''}`}
                disabled={v.stockStatus === 'out-of-stock'}
                onClick={() => setVariationId(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="option-group">
        <div className="option-group__label">Quantity</div>
        <div className="qty-stepper">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            −
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
            +
          </button>
        </div>
      </div>

      <div className="purchase-row">
        <button
          type="button"
          className="btn btn--primary btn--lg"
          disabled={soldOut}
          onClick={() => variation && addItem(product, variation, quantity)}
        >
          {soldOut ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>

      <div className="option-group">
        <div className="option-group__label">Bulk Pricing</div>
        <table className="bulk-pricing-table">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {[...BULK_TIERS].reverse().map((tier) => (
              <tr key={tier.label} className={tier.label === activeTier.label ? 'active-tier' : ''}>
                <td>{tier.label}</td>
                <td>{tier.discountPercent > 0 ? `${tier.discountPercent}%` : '—'}</td>
                <td>${getDiscountedUnitPrice(unitPrice, tier.minQty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="disclaimer-box">
        This product is sold strictly for laboratory research use only. Not
        for human or veterinary use. Not a drug, food, or cosmetic.
      </div>
    </div>
  );
}
