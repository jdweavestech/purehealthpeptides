'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import type { COA } from '@/lib/types';

interface Props {
  product: Product;
  coa?: COA;
}

const TABS = ['Description', 'Research', 'Specifications', 'COA'] as const;

export function ProductTabs({ product, coa }: Props) {
  const [active, setActive] = useState<(typeof TABS)[number]>('Description');

  return (
    <div>
      <div className="tabs__list" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            className={`tabs__trigger ${active === tab ? 'tabs__trigger--active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 'Description' && <p>{product.description}</p>}

      {active === 'Research' && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xs)' }}>
          {product.researchApplications.map((app) => (
            <li key={app} style={{ fontSize: 'var(--fs-sm)' }}>
              • {app}
            </li>
          ))}
        </ul>
      )}

      {active === 'Specifications' && (
        <table className="spec-table">
          <tbody>
            {product.specifications.map((spec) => (
              <tr key={spec.label}>
                <td>{spec.label}</td>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {active === 'COA' && (
        coa ? (
          <div>
            <p>
              Batch {coa.batchNumber} tested {coa.purityPercent}% purity by{' '}
              {coa.laboratory} on {new Date(coa.testingDate).toLocaleDateString()}.
            </p>
            <a href={coa.downloadUrl} className="btn btn--secondary btn--sm">
              Download COA
            </a>
          </div>
        ) : (
          <p>Certificate of analysis will be available shortly.</p>
        )
      )}
    </div>
  );
}
