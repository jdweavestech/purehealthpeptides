/**
 * Proxies images from the WooCommerce media library.
 *
 * Some WordPress hosts/CDNs (Cloudflare Bot Fight Mode, Wordfence hotlink
 * protection, etc.) reject the server-to-server fetch that Next's image
 * optimizer makes because it doesn't look like a real browser request.
 * Routing through this proxy lets us send browser-like headers and — more
 * importantly — restricts fetching to the configured store's own hostname,
 * so this can't be used as an open image-fetching proxy for arbitrary URLs.
 */
import { NextRequest, NextResponse } from 'next/server';

const STORE_URL = process.env.WOOCOMMERCE_STORE_URL;

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('url');
  if (!target) {
    return NextResponse.json({ error: 'Missing url param' }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(target);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  const allowedHost = STORE_URL ? new URL(STORE_URL).hostname : null;
  if (!allowedHost || targetUrl.hostname !== allowedHost) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
  }

  const upstream = await fetch(targetUrl.toString(), {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Referer: STORE_URL!,
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
    next: { revalidate: 3600 },
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: `Upstream returned ${upstream.status}` },
      { status: upstream.status }
    );
  }

  const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';
  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
