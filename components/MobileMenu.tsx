'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { CloseIcon } from './icons';

interface Props {
  navLinks: { label: string; href: string }[];
  onClose: () => void;
}

export function MobileMenu({ navLinks, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="mobile-menu__header">
          <span className="site-header__logo">
            Pure Health <span style={{ color: 'var(--color-accent)' }}>Peptides</span>
          </span>
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <ul className="mobile-menu__list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="mobile-menu__link" onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/account" className="mobile-menu__link" onClick={onClose}>
              Account
            </Link>
          </li>
          <li>
            <Link href="/cart" className="mobile-menu__link" onClick={onClose}>
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
