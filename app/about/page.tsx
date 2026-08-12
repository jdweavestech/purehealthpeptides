import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <div style={{ maxWidth: 720 }}>
        <h1>About Pure Health Peptides</h1>
        <p>
          Pure Health Peptides supplies research-grade peptides to laboratories
          and qualified researchers. Every batch is independently tested by a
          third-party U.S. laboratory, with results published as a
          batch-specific certificate of analysis before a product ever ships.
        </p>
        <p>
          We built this storefront around three principles: transparency in
          testing, clarity in documentation, and a research-first approach to
          every product we carry. All products are strictly for laboratory
          research use only.
        </p>
      </div>
    </div>
  );
}
