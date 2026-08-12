import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'FAQ' };

const FAQS = [
  {
    q: 'What does "research use only" mean?',
    a: 'All products sold by Pure Health Peptides are intended strictly for laboratory research purposes by qualified individuals. They are not intended for human or animal consumption, and are not drugs, foods, or cosmetics.',
  },
  {
    q: 'How is purity tested?',
    a: 'Every batch is sent to an independent third-party U.S. laboratory for analysis. Results are published as a batch-specific Certificate of Analysis (COA), available through our COA Verification tool.',
  },
  {
    q: 'How do I find the batch number on my product?',
    a: 'The batch number is printed on the vial label and the outer packaging. Enter it on the COA Verification page to view test results.',
  },
  {
    q: 'What is your shipping policy?',
    a: 'Orders over $175 ship free. See the Shipping page for full carrier and processing-time details.',
  },
];

export default function FaqPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <h1>Frequently Asked Questions</h1>
      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {FAQS.map((item) => (
          <div key={item.q} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
            <h3 style={{ marginBottom: 'var(--spacing-2xs)' }}>{item.q}</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
