export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderLineItem {
  productName: string;
  variationLabel: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  placedAt: string;
  items: OrderLineItem[];
  total: number;
}
