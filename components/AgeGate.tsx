'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'php_age_gate_confirmed_v1';

export function AgeGate() {
  const [confirmed, setConfirmed] = useState(true); // default true to avoid flash; corrected on mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setConfirmed(stored === 'true');
    setMounted(true);
  }, []);

  if (!mounted || confirmed) return null;

  const handleConfirm = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setConfirmed(true);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="age-gate-overlay" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate">
        <div className="age-gate__mark">
          Pure Health <span>Peptides</span>
        </div>
        <h2 id="age-gate-title" className="visually-hidden">
          Age and research-use confirmation
        </h2>
        <p className="age-gate__text">
          By entering this site, you confirm that you are 21 years of age or
          older and understand that all products are intended strictly for
          research use only.
        </p>
        <div className="age-gate__actions">
          <button type="button" className="btn btn--primary" onClick={handleConfirm}>
            I Confirm — Enter Site
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
