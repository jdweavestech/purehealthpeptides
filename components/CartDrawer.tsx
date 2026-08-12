'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart/cart-context';
import { CloseIcon } from './icons';
import { EmptyState } from './EmptyState';
import {
  FREE_SHIPPING_THRESHOLD,
  amountRemainingForFreeShipping,
  freeShippingProgressPercent,
} from '@/lib/pricing/shipping';

export function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, removeItem, setQuantity } = useCart();

  if (!isDrawerOpen) return null;

  const remaining = amountRemainingForFreeShipping(cart.total);
  const progress = freeShippingProgressPercent(cart.total);

  return (
    <>
      <div className="cart-drawer-overlay" onClick={closeDrawer} />
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2 style={{ margin: 0, fontSize: 'var(--fs-md)' }}>Your Cart</h2>
          <button type="button" className="icon-btn" aria-label="Close cart" onClick={closeDrawer}>
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer__items">
          {cart.items.length === 0 ? (
            <EmptyState title="Your cart is empty" description="Browse the shop to add research compounds." />
          ) : (
            <>
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

              {cart.items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item__image">
                    {item.image && (
                      <Image src={item.image} alt={item.productName} width={72} height={72} style={{ objectFit: 'cover' }} />
                    )}
                  </div>
                  <div>
                    <div className="cart-item__name">{item.productName}</div>
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
            </>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="cart-drawer__footer">
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
            <div className="cart-summary-row cart-summary-row--total">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <Link href="/cart" className="btn btn--primary btn--full" style={{ marginTop: 'var(--spacing-sm)' }} onClick={closeDrawer}>
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
