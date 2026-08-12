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
