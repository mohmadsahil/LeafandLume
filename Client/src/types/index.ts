import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
}

export type ProductCategory = 'cleanser' | 'serum' | 'moisturizer' | 'sunscreen' | 'oil' | 'mask';
export type SkinConcern =
  | 'dryness'
  | 'dullness'
  | 'pigmentation'
  | 'acne'
  | 'aging'
  | 'sensitivity';

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  concerns: SkinConcern[];
  ingredients: string[];
  size: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  bestseller?: boolean;
  isNew?: boolean;
  benefits: string[];
  usage: string;
}

export interface Category {
  id: string;
  slug: ProductCategory;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface Concern {
  id: string;
  slug: SkinConcern;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefit: string;
  emoji: string;
  color: string;
  concentration?: string;
  howItWorks?: string[];
}

export interface Reel {
  id: string;
  thumbnail: string;
  videoUrl?: string;
  caption: string;
  author: string;
  productSlug: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  title?: string;
  quote: string;
  rating: number;
  verified?: boolean;
  productSlug?: string;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'flat';
  discountValue: number;
  minOrder?: number;
  expiresAt: string;
  expired?: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}
