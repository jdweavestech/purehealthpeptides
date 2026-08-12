'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SearchIcon, UserIcon, CartIcon, MenuIcon } from './icons';
import { MobileMenu } from './MobileMenu';
import { useCart } from '@/lib/cart/cart-context';

export function HeaderActions({ navLinks }: { navLinks: { label: string; href: string }[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openDrawer } = useCart();
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="site-header__actions">
      <Link href="/shop" className="icon-btn" aria-label="Search products">
        <SearchIcon />
      </Link>
      <Link href="/login" className="icon-btn" aria-label="Account">
        <UserIcon />
      </Link>
      <button
        type="button"
        className="icon-btn cart-badge"
        aria-label={`Cart, ${itemCount} items`}
        onClick={openDrawer}
      >
        <CartIcon />
        {itemCount > 0 && <span className="cart-badge__count">{itemCount}</span>}
      </button>
      <button
        type="button"
        className="icon-btn mobile-menu-trigger"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <MenuIcon />
      </button>

      {menuOpen && <MobileMenu navLinks={navLinks} onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
