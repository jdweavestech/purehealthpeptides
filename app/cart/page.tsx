import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CartPageClient } from './CartPageClient';

export const metadata: Metadata = { title: 'Your Cart' };

export default function CartPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1>Your Cart</h1>
      <CartPageClient />
    </div>
  );
}
