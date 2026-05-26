import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().max(200).optional().or(z.literal("")),
  description: z.string().min(5, "Description is required"),
  sku: z.string().min(2, "SKU is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  mrpPrice: z.coerce.number().min(0),
  salePrice: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).max(100).default(0),
  tax: z.coerce.number().min(0).max(100).default(0),
  currency: z.string().default("USD"),
  inventory: z.object({
    totalStock: z.coerce.number().int().min(0),
    lowStockAlert: z.coerce.number().int().min(0),
    warehouse: z.string().min(1),
    batchNumber: z.string().optional().or(z.literal("")),
    expiryDate: z.string().optional().or(z.literal("")),
  }),
  skincare: z.object({
    skinType: z.array(z.string()).default([]),
    skinConcerns: z.array(z.string()).default([]),
    ingredients: z.string().default(""),
    usageInstructions: z.string().default(""),
    benefits: z.string().default(""),
    dermatologicallyTested: z.boolean().default(false),
    vegan: z.boolean().default(false),
    crueltyFree: z.boolean().default(false),
    sulfateFree: z.boolean().default(false),
    parabenFree: z.boolean().default(false),
  }),
  seo: z.object({
    metaTitle: z.string().default(""),
    metaDescription: z.string().default(""),
    focusKeyword: z.string().default(""),
    slug: z.string().default(""),
    ogImage: z.string().optional().or(z.literal("")),
  }),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
