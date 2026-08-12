import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'Research Use Disclaimer' };

export default function DisclaimerPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]} />
      <div style={{ maxWidth: 720 }}>
        <h1>Research Use Disclaimer</h1>
        <p>
          All products offered by Pure Health Peptides are sold strictly for
          laboratory research purposes. They are not drugs, foods, dietary
          supplements, or cosmetics, and are not intended for human or
          veterinary use. Products should be handled only by qualified
          professionals in a controlled research setting.
        </p>
      </div>
    </div>
  );
}
