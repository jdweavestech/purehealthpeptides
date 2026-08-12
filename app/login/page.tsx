import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'Login' };

// Phase 2: wire to WooCommerce/WordPress customer auth (JWT or session-based).
export default function LoginPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Login' }]} />
      <div style={{ maxWidth: 420 }}>
        <h1>Log In</h1>
        <form>
          <div className="field">
            <label className="field__label" htmlFor="email">Email</label>
            <input className="input" id="email" type="email" name="email" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="password">Password</label>
            <input className="input" id="password" type="password" name="password" />
          </div>
          <button type="submit" className="btn btn--primary btn--full">Log In</button>
        </form>
        <p style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--spacing-sm)' }}>
          New here? <Link href="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
