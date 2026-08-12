/**
 * Shipping/promotion thresholds. Centralized so copy and logic stay in sync.
 * Will later be replaced/synced with WooCommerce shipping zones & rules.
 */
export const FREE_SHIPPING_THRESHOLD = 175;
export const FREE_VIAL_VAULT_THRESHOLD = 75;

export function amountRemainingForFreeShipping(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}

export function freeShippingProgressPercent(subtotal: number): number {
  return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
}
