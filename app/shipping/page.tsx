import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/pricing/shipping';

export const metadata: Metadata = { title: 'Shipping' };

export default function ShippingPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shipping' }]} />
      <div style={{ maxWidth: 720 }}>
        <h1>Shipping</h1>
        <p>Orders over ${FREE_SHIPPING_THRESHOLD} ship free within the U.S.</p>
        <p>Orders are typically processed within 1–2 business days and shipped in discreet, unmarked packaging.</p>
      </div>
    </div>
  );
}
