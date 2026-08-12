'use client';

import { ErrorState } from '@/components/ErrorState';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container section">
      <ErrorState onRetry={reset} />
    </div>
  );
}
