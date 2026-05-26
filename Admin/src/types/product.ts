import type { ID } from "./common";

export type ProductStatus = "draft" | "published" | "archived";

export type ProductVariant = {
  id: ID;
  size?: string;
  volume?: string;
  fragrance?: string;
  sku: string;
  price: number;
  stock: number;
};

export type ProductImage = {
  id: ID;
  url: string;
  alt?: string;
  isFeatured?: boolean;
};

export type ProductSEO = {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  slug: string;
  ogImage?: string;
};

export type ProductInventory = {
  totalStock: number;
  lowStockAlert: number;
  warehouse: string;
  batchNumber?: string;
  expiryDate?: string;
};

export type SkincareFields = {
  skinType: string[];
  skinConcerns: string[];
  ingredients: string;
  usageInstructions: string;
  benefits: string;
  dermatologicallyTested: boolean;
  vegan: boolean;
  crueltyFree: boolean;
  sulfateFree: boolean;
  parabenFree: boolean;
};

export type Product = {
  id: ID;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  brand: string;
  category: string;
  subcategory?: string;
  tags: string[];
  mrpPrice: number;
  salePrice: number;
  discount: number;
  tax: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  inventory: ProductInventory;
  skincare: SkincareFields;
  seo: ProductSEO;
  status: ProductStatus;
  rating: number;
  reviewsCount: number;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
};
