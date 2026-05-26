export const siteConfig = {
  name: 'Leaf & Lume',
  tagline: 'Botanical skincare, beautifully crafted.',
  description:
    'Leaf & Lume is a premium botanical skincare brand. Clean, science-backed formulations designed for radiant, healthy skin.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/og-image.png',
  keywords: [
    'skincare',
    'botanical skincare',
    'serum',
    'moisturizer',
    'face oil',
    'clean beauty',
    'luxury skincare',
    'Leaf and Lume',
  ],
  twitterHandle: '@leafandlume',
  author: { name: 'Leaf & Lume', url: 'https://leafandlume.example.com' },
  contact: {
    email: 'hello@leafandlume.example.com',
    phone: '+1 (555) 010-1234',
    address: 'Studio 14, Botanical Lane, Brooklyn NY',
  },
  links: {
    instagram: 'https://instagram.com/leafandlume',
    twitter: 'https://twitter.com/leafandlume',
    facebook: 'https://facebook.com/leafandlume',
    youtube: 'https://youtube.com/leafandlume',
  },
} as const;

export type SiteConfig = typeof siteConfig;
