import type { ID } from "./common";

export type Video = {
  id: ID;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  url: string;
  duration: string;
  relatedProductId?: ID;
  relatedProductName?: string;
  relatedCategory?: string;
  featured: boolean;
  autoplay: boolean;
  loop: boolean;
  views: number;
  likes: number;
  status: "published" | "draft";
  createdAt: string;
};
