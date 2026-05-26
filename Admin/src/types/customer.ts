import type { ID } from "./common";

export type CustomerAddress = {
  id: ID;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  isDefault: boolean;
};

export type Customer = {
  id: ID;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  ordersCount: number;
  totalSpend: number;
  skinType: string;
  skinConcerns: string[];
  loyaltyPoints: number;
  status: "active" | "inactive";
  addresses: CustomerAddress[];
  wishlist: { productId: ID; name: string; image: string; price: number }[];
  subscriptionHistory: {
    id: ID;
    plan: string;
    status: string;
    startDate: string;
    nextRenewal?: string;
  }[];
  createdAt: string;
};
