export interface CartItem {
  id: string; // unique cart line id (product + variation)
  productId: string;
  productSlug: string;
  productName: string;
  variationId: string;
  variationLabel: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  total: number;
}
