import type { ID } from "./common";

export type Banner = {
  id: ID;
  title: string;
  subtitle?: string;
  type: string;
  desktopImage: string;
  mobileImage: string;
  ctaText: string;
  ctaUrl: string;
  position: string;
  startDate: string;
  endDate?: string;
  status: "active" | "inactive" | "scheduled";
  impressions: number;
  clicks: number;
  ctr: number;
  createdAt: string;
};
