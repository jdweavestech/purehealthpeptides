export type ProductFormat = 'vial' | 'capsule' | 'liquid' | 'topical';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductVariation {
  id: string;
  label: string; // e.g. "5mg", "10mg", "30 capsules"
  price: number; // in USD
  compareAtPrice?: number;
  sku: string;
  stockStatus: StockStatus;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlugs: string[];
  format: ProductFormat;
  images: ProductImage[];
  variations: ProductVariation[];
  /** True if this product has real selectable variations (size/format/etc).
   *  Listing views (grid, related products) don't fetch variations for
   *  performance, so this flag — not variations.length — is the source of
   *  truth for whether "Add to Cart" can act on variations[0] directly or
   *  needs to send the shopper to the product page to pick one. */
  hasVariations: boolean;
  basePrice: number;
  compareAtPrice?: number;
  stockStatus: StockStatus;
  featured: boolean;
  researchApplications: string[];
  specifications: { label: string; value: string }[];
  coaId?: string;
  infoCardId?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  productCount: number;
}
