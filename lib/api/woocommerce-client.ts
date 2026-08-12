/**
 * Server-only API clients.
 *
 * - wooFetch: WooCommerce REST API (products, categories). Requires
 *   consumer key/secret — never import this from a Client Component.
 * - wpFetch: the site's custom REST namespace (php/v1) that exposes
 *   COA and Product Info Card data from a custom post type. Public
 *   reads, no secret required — see /wordpress-integration in the
 *   project root for the PHP that registers these routes.
 */
import 'server-only';

const STORE_URL = process.env.WOOCOMMERCE_STORE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export class WooCommerceConfigError extends Error {}

function assertWooConfigured() {
  if (!STORE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new WooCommerceConfigError(
      'WooCommerce credentials are not configured. Set WOOCOMMERCE_STORE_URL, ' +
        'WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET in your environment.'
    );
  }
}

export function isWooConfigured(): boolean {
  return Boolean(STORE_URL && CONSUMER_KEY && CONSUMER_SECRET);
}

interface FetchOptions extends RequestInit {
  /** ISR revalidation window in seconds. Defaults to 300 (5 min). */
  revalidate?: number;
}

/** Calls the authenticated WooCommerce REST API (`/wp-json/wc/v3/...`). */
export async function wooFetch<T>(path: string, params?: Record<string, string | number | boolean>, options?: FetchOptions): Promise<T> {
  assertWooConfigured();

  const url = new URL(`/wp-json/wc/v3${path}`, STORE_URL);
  url.searchParams.set('consumer_key', CONSUMER_KEY!);
  url.searchParams.set('consumer_secret', CONSUMER_SECRET!);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    next: { revalidate: options?.revalidate ?? 300 },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error ${res.status} on ${path}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}

/** Calls the site's custom public REST namespace (`/wp-json/php/v1/...`) for COA + info card data. */
export async function wpFetch<T>(path: string, params?: Record<string, string | number | boolean>, options?: FetchOptions): Promise<T> {
  if (!STORE_URL) {
    throw new WooCommerceConfigError('WOOCOMMERCE_STORE_URL is not configured.');
  }

  const url = new URL(`/wp-json/php/v1${path}`, STORE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    next: { revalidate: options?.revalidate ?? 300 },
  });

  if (!res.ok) {
    throw new Error(`Site API error ${res.status} on ${path}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}
