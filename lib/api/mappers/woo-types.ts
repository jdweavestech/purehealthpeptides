/**
 * Minimal shape of the fields we read from the WooCommerce REST API.
 * Not exhaustive — WooCommerce returns many more fields; add them here
 * as you need them rather than typing the whole schema.
 */
export interface WooImage {
  id: number;
  src: string;
  alt: string;
}

export interface WooCategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface WooProduct {
  id: number;
  slug: string;
  name: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  short_description: string;
  description: string;
  type: 'simple' | 'variable' | string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  featured: boolean;
  categories: WooCategoryRef[];
  images: WooImage[];
  attributes: WooAttribute[];
  meta_data: { id: number; key: string; value: unknown }[];
}

export interface WooProductVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  attributes: { id: number; name: string; option: string }[];
}

export interface WooCategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
  image: { src: string } | null;
}
