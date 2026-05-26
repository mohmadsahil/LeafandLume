import type { ID } from "./common";

export type SeoPage = {
  id: ID;
  url: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonical: string;
  score: number;
  status: "good" | "warning" | "poor";
  indexed: boolean;
  lastChecked: string;
};

export type SeoRedirect = {
  id: ID;
  from: string;
  to: string;
  type: "301" | "302";
  hits: number;
  createdAt: string;
};

export type SeoOverview = {
  averageScore: number;
  indexedPages: number;
  totalPages: number;
  brokenLinks: number;
  redirects: number;
  topKeywords: { keyword: string; position: number; volume: number }[];
  recommendations: { id: ID; level: "info" | "warning" | "critical"; message: string }[];
};
