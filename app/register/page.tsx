import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'Create Account' };

export default function RegisterPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Register' }]} />
      <div style={{ maxWidth: 420 }}>
        <h1>Create Account</h1>
        <form>
          <div className="field">
            <label className="field__label" htmlFor="name">Full Name</label>
            <input className="input" id="name" name="name" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="email">Email</label>
            <input className="input" id="email" type="email" name="email" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="password">Password</label>
            <input className="input" id="password" type="password" name="password" />
          </div>
          <button type="submit" className="btn btn--primary btn--full">Create Account</button>
        </form>
        <p style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--spacing-sm)' }}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
