# Pure Health Peptides — Headless Storefront (Phase 1)

Next.js 14 (App Router) + TypeScript + custom CSS. No Tailwind. WooCommerce-ready
data layer running on mock data for this phase.

## Getting started

```bash
npm install
npm run dev
```

## Connecting real WooCommerce data

The site now reads live data when WooCommerce credentials are present, and
falls back to the Phase 1 mock data automatically when they're not (so
`npm run dev` still works with no setup).

**1. WordPress side.** Install the plugin in `wordpress-integration/pure-health-peptides-api.php`:
either zip that single file and upload it under Plugins → Add New → Upload
Plugin, or drop it into `wp-content/mu-plugins/` (create that folder if it
doesn't exist — must-use plugins need no activation). It:

- Registers `coa` and `info_card` custom post types (with a basic admin UI
  so you can add entries by hand) — these are what back COA Verification
  and Product Info Cards, since WooCommerce has no native equivalent.
- Registers extra meta fields directly on WooCommerce products
  (`research_applications`, `specifications`, `coa_id`, `info_card_id`) —
  these ride along automatically in the normal product REST response.
- Adds a small public, read-only REST namespace at `/wp-json/php/v1/` with
  two routes: `GET /coa?batch_number=...` and `GET /info-cards`.

Then, per product: add a **Format** attribute (Vial / Capsule / Liquid /
Topical) under Product data → Attributes, and optionally fill in the four
custom meta fields above (visible in the block editor's "Custom Fields"
panel, or manage them with ACF if you prefer — either way, register them
with `show_in_rest => true` as the plugin does). To link a product to a
COA, set `coa_id` to that COA post's `batch_number`; for an info card, set
`info_card_id` to the product's own slug.

**2. Next.js side.** Copy `.env.example` to `.env.local` and fill in:

```
WOOCOMMERCE_STORE_URL=https://your-wp-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...
```

Generate the key/secret under WooCommerce → Settings → Advanced → REST API
— **Read** permissions are enough for everything this phase does. Restart
`npm run dev` after adding the file.

**Image 403s.** If product images fail to load with a 403 on
`/_next/image?url=...`, it's almost always the WordPress host or a
CDN/security layer (Cloudflare Bot Fight Mode, Wordfence hotlink
protection, etc.) rejecting the server-to-server fetch Next's image
optimizer makes, because it doesn't look like a real browser request.
`app/api/media/route.ts` works around this: it proxies WooCommerce media
through the Next server with browser-like headers, and
`lib/api/mappers/image-proxy.ts` automatically rewrites any image URL on
your store's own hostname to go through it — nothing else to configure.
It only proxies URLs matching `WOOCOMMERCE_STORE_URL`'s hostname, so it
can't be used as an open image-fetching proxy. If images are still
blocked after this, the block is likely IP-based rather than header-based
— check your host/CDN's firewall or hotlink-protection settings for the
server's outbound IP.
That's it — `lib/api/products.ts`, `coa.ts`, and `info-cards.ts` all check
`isWooConfigured()` and switch to live WooCommerce/WordPress data
automatically once the env vars are set. No component or page changes are
needed; they only ever call the `lib/api/*` functions.

**What's still simulated:** cart/checkout stays client-side (localStorage)
per the original Phase 1 scope — see "Explicitly deferred" below. Product
*browsing* (shop, categories, product detail, search, sort, COA lookup,
info cards) is fully live once the above is done.

## What's included in this phase

- Full design-token CSS system (`styles/variables.css`) — change the brand
  color, type, spacing, or radius sitewide from one file.
- Global layout: announcement bar, sticky header w/ mobile slide-out menu,
  footer, age/research-use gate, cart drawer.
- Homepage: hero, trust section, volume-pricing band, featured products,
  research categories.
- `/shop` — full catalog with URL-driven category/format filters, search,
  and sort (`/shop?category=regeneration-longevity&format=vial`).
- `/shop/[category]` — category landing pages.
- `/product/[slug]` — gallery, variation + quantity selection, live bulk
  pricing table, tabbed description/research/specs/COA, related products,
  JSON-LD product structured data.
- `/cart` — full cart page (in addition to the header drawer), free-shipping
  progress bar, bulk-discount line item.
- `/coa-verification` — batch-number lookup UI with loading, not-found, and
  result states (mock data).
- `/info-cards` — searchable/filterable product documentation library (mock
  data).
- Placeholder routes for `/faq`, `/about`, `/shipping`, `/contact`,
  `/login`, `/register`, `/account`, `/account/orders`, `/terms`,
  `/privacy`, `/disclaimer`.
- Loading, empty, and error states throughout; global `loading.tsx` /
  `error.tsx` / `not-found.tsx`.
- `sitemap.ts` / `robots.ts`, per-page metadata, Open Graph tags.

## Architecture

```
Next.js pages/components
        ↓
lib/api/*        ← the ONLY layer pages/components should import from
        ↓
lib/data/*        (Phase 1: mock data)   →   WooCommerce REST API (Phase 2)
```

- `lib/types/` — normalized `Product`, `ProductVariation`, `Category`,
  `CartItem`, `Cart`, `Customer`, `Order`, `COA`, `ProductInfoCard`.
- `lib/data/` — centralized mock data (products, categories, COAs, info
  cards). Nothing else should hold mock data inline.
- `lib/api/` — the data-access layer pages actually call
  (`getProducts()`, `getProductBySlug()`, `getCategories()`, `getCOA()`,
  `getProductInfoCard()`, etc). Each function calls the live WooCommerce
  REST API (via `woocommerce-client.ts`) when `WOOCOMMERCE_*` env vars are
  set, and falls back to the Phase 1 mock data otherwise — see
  "Connecting real WooCommerce data" above. `mappers/product-mapper.ts`
  converts WooCommerce's REST shape into this project's normalized
  `Product`/`Category` types, so nothing outside `lib/api/` ever sees a raw
  WooCommerce response. `woocommerce-client.ts` is server-only and is never
  imported by a Client Component.
- `lib/pricing/bulk-pricing.ts` — the 2/5/10/15%-off ladder, isolated from
  any component so it can be swapped for WooCommerce quantity-pricing rules
  later without touching UI.
- `lib/cart/cart-context.tsx` — client-side cart (React context +
  localStorage). Structured so the same `addItem`/`removeItem` calls can
  later trigger WooCommerce Store API session calls instead.

## Explicitly deferred to Phase 2 (per project brief)

Real payments/checkout, real WooCommerce order sync, OTP, KYC, customer
auth, shipping-rate API, tax calculation, and COA/document backend storage
are **not** implemented — only the routes, UI, and data interfaces they'll
plug into. Search `TODO(woocommerce)` and `TODO(backend)` across `lib/` for
every swap point.

## Styling

Everything lives in `styles/` — `variables.css` for tokens, `globals.css`
for base elements, `styles/components/*.css` for one file per UI area
(header, footer, product-card, cart, filters, etc). No CSS-in-JS, no inline
style objects, no Tailwind.
