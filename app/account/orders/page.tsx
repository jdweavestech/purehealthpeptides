import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/EmptyState';

export const metadata: Metadata = { title: 'Order History' };

// Phase 2: fetch real orders via WooCommerce REST API scoped to the logged-in customer.
export default function OrdersPage() {
  return (
    <div className="container section">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Account', href: '/account' }, { label: 'Orders' }]}
      />
      <h1>Order History</h1>
      <EmptyState title="No orders yet" description="Orders will appear here once checkout is connected." />
    </div>
  );
}
