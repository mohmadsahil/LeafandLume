import type { ID } from "./common";

export type Review = {
  id: ID;
  customer: { id: ID; name: string; avatar?: string };
  product: { id: ID; name: string; image: string };
  rating: number;
  title?: string;
  text: string;
  images?: string[];
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  hasVideo: boolean;
  spamScore: number;
  createdAt: string;
};
