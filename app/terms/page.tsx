import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <div style={{ maxWidth: 720 }}>
        <h1>Terms of Service</h1>
        <p>
          By purchasing from Pure Health Peptides, you agree that all products
          are sold strictly for laboratory research use only, by individuals
          qualified to handle such materials. Full legal terms will be
          finalized with counsel prior to launch.
        </p>
      </div>
    </div>
  );
}
