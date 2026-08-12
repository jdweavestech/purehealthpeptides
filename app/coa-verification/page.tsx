import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { COAVerificationForm } from '@/components/COAVerificationForm';

export const metadata: Metadata = {
  title: 'COA Verification',
  description: 'Verify the independent lab-testing results for your Pure Health Peptides batch.',
};

export default function COAVerificationPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'COA Verification' }]} />
      <div className="section-heading" style={{ margin: '0 auto var(--spacing-lg)', textAlign: 'center' }}>
        <span className="eyebrow">Transparency</span>
        <h1 className="section-heading__title">Verify a Certificate of Analysis</h1>
      </div>
      <COAVerificationForm />
    </div>
  );
}
