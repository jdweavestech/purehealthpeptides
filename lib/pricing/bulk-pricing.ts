/**
 * Isolated bulk-pricing logic.
 * Kept separate from UI components so it can later be replaced or
 * synchronized with WooCommerce quantity-pricing rules/plugins.
 */

export interface BulkTier {
  minQty: number;
  discountPercent: number;
  label: string;
}

/** Vial quantity discount ladder, per project spec. */
export const BULK_TIERS: BulkTier[] = [
  { minQty: 15, discountPercent: 15, label: '15+ Vials' },
  { minQty: 10, discountPercent: 10, label: '10 Vials' },
  { minQty: 5, discountPercent: 5, label: '5 Vials' },
  { minQty: 2, discountPercent: 2, label: '2 Vials' },
  { minQty: 1, discountPercent: 0, label: '1 Vial' },
];

/** Returns the applicable tier for a given quantity (highest qualifying minQty). */
export function getTierForQuantity(quantity: number): BulkTier {
  return (
    BULK_TIERS.find((tier) => quantity >= tier.minQty) ??
    BULK_TIERS[BULK_TIERS.length - 1]
  );
}

/** Returns the discount percent (0-100) that applies at a given quantity. */
export function getDiscountPercent(quantity: number): number {
  return getTierForQuantity(quantity).discountPercent;
}

/** Applies the bulk discount to a unit price and returns the discounted unit price. */
export function getDiscountedUnitPrice(unitPrice: number, quantity: number): number {
  const percent = getDiscountPercent(quantity);
  return round2(unitPrice * (1 - percent / 100));
}

export function getLineTotal(unitPrice: number, quantity: number): number {
  return round2(getDiscountedUnitPrice(unitPrice, quantity) * quantity);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
