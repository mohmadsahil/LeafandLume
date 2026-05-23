import { Heart, Home, ShoppingBag, Sparkles, User } from 'lucide-react';
import type { NavItem } from '@/types';

export const mainNav: NavItem[] = [
  { title: 'Shop', href: '/shop' },
  { title: 'Bestsellers', href: '/shop?filter=bestseller' },
  { title: 'New', href: '/shop?filter=new' },
  { title: 'Routines', href: '/#routine' },
  { title: 'About', href: '/about' },
];

export const megaMenu = [
  {
    title: 'By Category',
    items: [
      { title: 'Cleansers', href: '/shop?cat=cleanser' },
      { title: 'Serums', href: '/shop?cat=serum' },
      { title: 'Moisturizers', href: '/shop?cat=moisturizer' },
      { title: 'Sunscreen', href: '/shop?cat=sunscreen' },
      { title: 'Face Oils', href: '/shop?cat=oil' },
      { title: 'Masks', href: '/shop?cat=mask' },
    ],
  },
  {
    title: 'By Concern',
    items: [
      { title: 'Dryness', href: '/shop?concern=dryness' },
      { title: 'Dullness', href: '/shop?concern=dullness' },
      { title: 'Pigmentation', href: '/shop?concern=pigmentation' },
      { title: 'Acne', href: '/shop?concern=acne' },
      { title: 'Anti-aging', href: '/shop?concern=aging' },
      { title: 'Sensitivity', href: '/shop?concern=sensitivity' },
    ],
  },
  {
    title: 'By Ingredient',
    items: [
      { title: 'Niacinamide', href: '/shop?ing=niacinamide' },
      { title: 'Vitamin C', href: '/shop?ing=vitamin-c' },
      { title: 'Hyaluronic Acid', href: '/shop?ing=hyaluronic-acid' },
      { title: 'Retinol', href: '/shop?ing=retinol' },
      { title: 'Centella', href: '/shop?ing=centella' },
      { title: 'Squalane', href: '/shop?ing=squalane' },
    ],
  },
];

export const bottomNav = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Shop', href: '/shop', icon: Sparkles },
  { title: 'Wishlist', href: '/wishlist', icon: Heart },
  { title: 'Cart', href: '/cart', icon: ShoppingBag },
  { title: 'Profile', href: '/profile', icon: User },
] as const;

export const footerNav = [
  {
    title: 'Shop',
    items: [
      { title: 'All Products', href: '/shop' },
      { title: 'Bestsellers', href: '/shop?filter=bestseller' },
      { title: 'New Arrivals', href: '/shop?filter=new' },
      { title: 'Skin Quiz', href: '/#concerns' },
    ],
  },
  {
    title: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Contact', href: '/contact' },
      { title: 'Journal', href: '/#instagram' },
    ],
  },
  {
    title: 'Help',
    items: [
      { title: 'FAQ', href: '/faq' },
      { title: 'Orders', href: '/orders' },
      { title: 'Coupons', href: '/coupons' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { title: 'Privacy', href: '/privacy' },
      { title: 'Terms', href: '/terms' },
    ],
  },
] as const;
