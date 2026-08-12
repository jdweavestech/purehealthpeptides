import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <div style={{ maxWidth: 720 }}>
        <h1>Privacy Policy</h1>
        <p>
          This placeholder page will describe how customer data is collected,
          used, and protected. Full policy to be finalized with counsel prior
          to launch.
        </p>
      </div>
    </div>
  );
}
