import type { ID } from "./common";

export type DashboardStats = {
  totalRevenue: { value: number; delta: number };
  totalOrders: { value: number; delta: number };
  totalCustomers: { value: number; delta: number };
  conversionRate: { value: number; delta: number };
  activeSubscriptions: { value: number; delta: number };
  refundOrders: { value: number; delta: number };
  pendingOrders: { value: number; delta: number };
  lowStock: { value: number; delta: number };
};

export type ChartPoint = {
  label: string;
  revenue?: number;
  orders?: number;
  customers?: number;
  sales?: number;
  visitors?: number;
};

export type ActivityEntry = {
  id: ID;
  type: "order" | "review" | "customer" | "product" | "system";
  title: string;
  description: string;
  at: string;
  actor?: string;
};

export type TrafficSource = {
  source: string;
  visitors: number;
  share: number;
};
