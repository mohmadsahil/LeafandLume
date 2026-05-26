export const APP = {
  name: "Leaf & Lume",
  tagline: "Admin Dashboard",
  shortName: "L&L",
  email: "admin@leafandlume.com",
  currency: "USD",
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
} as const;

export const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
] as const;

export const PAYMENT_STATUSES = ["paid", "pending", "failed", "refunded"] as const;

export const PRODUCT_STATUSES = ["draft", "published", "archived"] as const;

export const BANNER_TYPES = [
  "Hero Banner",
  "Promotional Banner",
  "Offer Banner",
  "Collection Banner",
  "Popup Banner",
] as const;

export const VIDEO_TYPES = [
  "Product Video",
  "Tutorial",
  "Customer Testimonial",
  "Reel",
  "Influencer Video",
] as const;

export const ROLES = [
  "Super Admin",
  "Admin",
  "Product Manager",
  "SEO Manager",
  "Support Staff",
] as const;

export const SKIN_TYPES = [
  "Normal",
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
  "Mature",
] as const;

export const SKIN_CONCERNS = [
  "Acne",
  "Aging",
  "Dark Spots",
  "Dryness",
  "Dullness",
  "Hyperpigmentation",
  "Redness",
  "Sensitivity",
  "Wrinkles",
] as const;

export const CATEGORIES = [
  "Cleansers",
  "Toners",
  "Serums",
  "Moisturizers",
  "Sunscreens",
  "Masks",
  "Eye Care",
  "Body Care",
  "Lip Care",
  "Tools",
] as const;
