/** @type {import('next').NextConfig} */

// Derive the WooCommerce store's hostname so product images served from
// its Media Library (and any CDN in front of it) are allowed by
// next/image without hardcoding a domain.
function wooStoreHostname() {
  try {
    return new URL(process.env.WOOCOMMERCE_STORE_URL).hostname;
  } catch {
    return null;
  }
}

const storeHostname = wooStoreHostname();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'purehealthpeptides.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      ...(storeHostname ? [{ protocol: 'https', hostname: storeHostname }] : []),
      // If product images are served from a CDN (e.g. jetpack.wordpress.com
      // photon, a subdomain CDN, or S3), add another entry here.
    ],
  },
};

module.exports = nextConfig;
