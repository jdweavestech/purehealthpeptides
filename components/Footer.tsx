import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Vials', href: '/shop?format=vial' },
      { label: 'Capsules', href: '/shop?format=capsule' },
      { label: 'Liquids', href: '/shop?format=liquid' },
      { label: 'Topicals', href: '/shop?format=topical' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Research Categories', href: '/shop' },
      { label: 'COA Verification', href: '/coa-verification' },
      { label: 'Product Info Cards', href: '/info-cards' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Customer',
    links: [
      { label: 'My Account', href: '/account' },
      { label: 'Orders', href: '/account/orders' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Research Use Only', href: '/disclaimer' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand-col">
            <div className="site-footer__brand">Pure Health Peptides</div>
            <p className="site-footer__tagline">
              Research-grade peptides backed by independent testing, batch-level
              documentation, and transparent sourcing.
            </p>
            <form className="newsletter" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                className="input"
                placeholder="Email address"
                required
              />
              <button type="submit" className="btn btn--on-dark btn--sm">
                Sign Up
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="footer-col__title">{col.title}</div>
              <ul className="footer-col__list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-col__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Pure Health Peptides. All rights reserved.</span>
          <span>All products are sold strictly for laboratory research use only. Not for human consumption.</span>
        </div>
      </div>
    </footer>
  );
}
