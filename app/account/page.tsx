import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'My Account' };

// Phase 2: gate behind real auth and pull customer data from WooCommerce.
export default function AccountPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
      <h1>My Account</h1>
      <p style={{ color: 'var(--color-text-muted)' }}>
        Account management will connect to WooCommerce customer data in a later phase.
      </p>
      <Link href="/account/orders" className="btn btn--secondary">View Orders</Link>
    </div>
  );
}
