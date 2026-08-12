import Link from 'next/link';
import { AnnouncementBar } from './AnnouncementBar';
import { HeaderActions } from './HeaderActions';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Research Categories', href: '/shop#categories' },
  { label: 'COA Verification', href: '/coa-verification' },
  { label: 'Product Info Cards', href: '/info-cards' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
];

export function Header() {
  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="site-header__logo">
            Pure Health <span>Peptides</span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            <ul className="site-nav__list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-nav__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <HeaderActions navLinks={NAV_LINKS} />
        </div>
      </header>
    </>
  );
}
