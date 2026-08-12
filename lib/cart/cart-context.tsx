'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Cart, CartItem, Product, ProductVariation } from '@/lib/types';
import { getDiscountedUnitPrice } from '@/lib/pricing/bulk-pricing';

interface CartContextValue {
  cart: Cart;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, variation: ProductVariation, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'php_cart_v1';

function computeCart(items: CartItem[]): Cart {
  let subtotal = 0;
  let discountedTotal = 0;

  for (const item of items) {
    subtotal += item.unitPrice * item.quantity;
    discountedTotal += getDiscountedUnitPrice(item.unitPrice, item.quantity) * item.quantity;
  }

  return {
    items,
    subtotal: round2(subtotal),
    discountTotal: round2(subtotal - discountedTotal),
    total: round2(discountedTotal),
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // NOTE: uses in-memory + localStorage persistence for Phase 1 mock cart.
  // This will be replaced with WooCommerce Cart/Store API session sync.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, variation: ProductVariation, quantity = 1) => {
    setItems((prev) => {
      const lineId = `${product.id}__${variation.id}`;
      const existing = prev.find((i) => i.id === lineId);
      if (existing) {
        return prev.map((i) =>
          i.id === lineId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const newItem: CartItem = {
        id: lineId,
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        variationId: variation.id,
        variationLabel: variation.label,
        image: product.images[0]?.url ?? '',
        unitPrice: variation.price,
        quantity,
      };
      return [...prev, newItem];
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== lineId));
  }, []);

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== lineId)
        : prev.map((i) => (i.id === lineId ? { ...i, quantity } : i))
    );
  }, []);

  const cart = useMemo(() => computeCart(items), [items]);

  const value: CartContextValue = {
    cart,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addItem,
    removeItem,
    setQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
