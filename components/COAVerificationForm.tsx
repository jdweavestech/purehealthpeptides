'use client';

import { useState } from 'react';
import type { COA } from '@/lib/types';
import { getCOA } from '@/lib/api/coa';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { CheckCircleIcon } from './icons';

type Status = 'idle' | 'loading' | 'found' | 'not-found' | 'error';

export function COAVerificationForm() {
  const [batchNumber, setBatchNumber] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<COA | undefined>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!batchNumber.trim()) return;
    setStatus('loading');
    try {
      const coa = await getCOA(batchNumber);
      if (coa) {
        setResult(coa);
        setStatus('found');
      } else {
        setStatus('not-found');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <div className="coa-search-box">
        <p>
          Enter the batch number printed on your product label to view its
          independent lab-testing results.
        </p>
        <form className="coa-search-form" onSubmit={handleSubmit}>
          <label htmlFor="batch-number" className="visually-hidden">
            Batch number
          </label>
          <input
            id="batch-number"
            className="input"
            placeholder="e.g. BPC157-2406A"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <button type="submit" className="btn btn--primary">
            Search
          </button>
        </form>
      </div>

      {status === 'loading' && (
        <div className="coa-result-card">
          <div className="skeleton skeleton-line skeleton-line--60" style={{ marginBottom: 'var(--spacing-sm)' }} />
          <div className="skeleton skeleton-line skeleton-line--40" />
        </div>
      )}

      {status === 'not-found' && (
        <EmptyState
          title="No COA found for that batch number"
          description="Double check the batch number on your product label, or contact support for help."
        />
      )}

      {status === 'error' && (
        <ErrorState
          title="Couldn't look up that batch"
          description="Something went wrong on our end. Please try again."
          onRetry={() => setStatus('idle')}
        />
      )}

      {status === 'found' && result && (
        <div className="coa-result-card">
          <div className="coa-result-card__header">
            <div>
              <h3 style={{ margin: 0 }}>{result.productName}</h3>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
                Batch {result.batchNumber}
              </span>
            </div>
            <span className="coa-result-card__status">
              <CheckCircleIcon width={16} height={16} /> Verified
            </span>
          </div>
          <dl className="coa-detail-grid">
            <div>
              <dt>Purity</dt>
              <dd>{result.purityPercent}%</dd>
            </div>
            <div>
              <dt>Testing Date</dt>
              <dd>{new Date(result.testingDate).toLocaleDateString()}</dd>
            </div>
            <div>
              <dt>Laboratory</dt>
              <dd>{result.laboratory}</dd>
            </div>
          </dl>
          <a href={result.downloadUrl} className="btn btn--secondary">
            Download COA
          </a>
        </div>
      )}
    </div>
  );
}
