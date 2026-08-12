/**
 * Rewrites a WooCommerce media URL to go through /api/media, so the
 * request the app makes has browser-like headers and isn't blocked by
 * hotlink protection / bot-mitigation on the WordPress host. Only URLs
 * on the configured store's own hostname get rewritten — anything else
 * (e.g. an external CDN you've already allow-listed) passes through.
 */
const STORE_URL = process.env.WOOCOMMERCE_STORE_URL;

export function toProxiedImageUrl(url: string): string {
  if (!STORE_URL || !url) return url;

  try {
    const storeHost = new URL(STORE_URL).hostname;
    const imageHost = new URL(url).hostname;
    if (imageHost !== storeHost) return url;
    return `/api/media?url=${encodeURIComponent(url)}`;
  } catch {
    return url;
  }
}
