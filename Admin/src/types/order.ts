import type { ID } from "./common";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export type OrderItem = {
  id: ID;
  productId: ID;
  productName: string;
  productImage: string;
  variant?: string;
  quantity: number;
  price: number;
  total: number;
};

export type OrderTimelineEntry = {
  id: ID;
  status: string;
  description: string;
  date: string;
};

export type Order = {
  id: ID;
  orderNumber: string;
  customer: {
    id: ID;
    name: string;
    email: string;
    avatar?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  trackingNumber?: string;
  carrier?: string;
  timeline: OrderTimelineEntry[];
  createdAt: string;
  updatedAt: string;
};
