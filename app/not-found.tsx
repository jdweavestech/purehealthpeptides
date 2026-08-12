import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link href="/" className="btn btn--primary">Return Home</Link>
    </div>
  );
}
