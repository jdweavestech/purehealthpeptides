'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart/cart-context';
import { EmptyState } from '@/components/EmptyState';
import {
  FREE_SHIPPING_THRESHOLD,
  amountRemainingForFreeShipping,
  freeShippingProgressPercent,
} from '@/lib/pricing/shipping';

export function CartPageClient() {
  const { cart, removeItem, setQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <EmptyState title="Your cart is empty" description="Browse the shop to add research compounds to your cart." />
    );
  }

  const remaining = amountRemainingForFreeShipping(cart.total);
  const progress = freeShippingProgressPercent(cart.total);
  const estimatedShipping = cart.total >= FREE_SHIPPING_THRESHOLD ? 0 : 9.95;

  return (
    <div className="cart-page">
      <div>
        {cart.items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item__image">
              {item.image && (
                <Image src={item.image} alt={item.productName} width={72} height={72} style={{ objectFit: 'cover' }} />
              )}
            </div>
            <div>
              <Link href={`/product/${item.productSlug}`} className="cart-item__name">
                {item.productName}
              </Link>
              <div className="cart-item__variant">{item.variationLabel}</div>
              <div className="qty-stepper" style={{ marginTop: 'var(--spacing-2xs)' }}>
                <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                  −
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button type="button" className="cart-item__remove" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
            <div className="cart-item__price">${(item.unitPrice * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="modal" style={{ padding: 'var(--spacing-md)' }}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>

          <div className="free-shipping-bar">
            <p className="free-shipping-bar__label">
              {remaining > 0
                ? `Add $${remaining.toFixed(2)} more for free shipping`
                : "You've unlocked free shipping"}
            </p>
            <div className="free-shipping-bar__track">
              <div className="free-shipping-bar__fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          {cart.discountTotal > 0 && (
            <div className="cart-summary-row">
              <span>Bulk discount</span>
              <span>−${cart.discountTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="cart-summary-row">
            <span>Estimated shipping</span>
            <span>{estimatedShipping === 0 ? 'Free' : `$${estimatedShipping.toFixed(2)}`}</span>
          </div>
          <div className="cart-summary-row cart-summary-row--total">
            <span>Total</span>
            <span>${(cart.total + estimatedShipping).toFixed(2)}</span>
          </div>

          {/* Phase 2: wire to WooCommerce checkout / Store API */}
          <button type="button" className="btn btn--primary btn--full" style={{ marginTop: 'var(--spacing-sm)' }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
