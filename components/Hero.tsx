import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div>
          <span className="eyebrow hero__eyebrow">Research-Grade Peptides</span>
          <h1 className="hero__title">
            Research-Grade Peptides.
            <br />
            Backed by Transparency.
          </h1>
          <p className="hero__desc">
            Every batch is independently tested by a third-party U.S.
            laboratory, with a certificate of analysis available before you
            buy. Sourced, documented, and shipped for laboratory research
            use only.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn btn--primary btn--lg">
              Shop Peptides
            </Link>
            <Link href="/coa-verification" className="btn btn--secondary btn--lg">
              Verify a COA
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <img
            src="https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?q=80&w=1200&auto=format&fit=crop"
            alt="Research vials arranged in a laboratory tray"
          />
          <div className="hero__badge">BATCH-TESTED · ≥98% PURITY</div>
        </div>
      </div>
    </section>
  );
}
