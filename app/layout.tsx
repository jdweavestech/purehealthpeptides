import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgeGate } from '@/components/AgeGate';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/lib/cart/cart-context';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://purehealthpeptides.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Pure Health Peptides — Research-Grade Peptides, Independently Tested',
    template: '%s | Pure Health Peptides',
  },
  description:
    'Research-grade peptides backed by independent U.S. laboratory testing and batch-level certificates of analysis. For laboratory research use only.',
  openGraph: {
    type: 'website',
    siteName: 'Pure Health Peptides',
    title: 'Pure Health Peptides — Research-Grade Peptides, Independently Tested',
    description:
      'Research-grade peptides backed by independent U.S. laboratory testing and batch-level certificates of analysis.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <AgeGate />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
