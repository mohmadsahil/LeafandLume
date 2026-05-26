import type { Testimonial } from '@/types';

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80`;

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aanya R.',
    role: 'Skin: combination, 28',
    avatar: portrait('1544005313-94ddf0286df2'),
    title: 'Just Love It!',
    quote:
      "I've been using the Glow Vitamin C Serum for a year now. It's lightweight & quick-absorbing. Reduces dullness too with a dewy finish. A must-buy!",
    rating: 5,
    verified: true,
    productSlug: 'glow-serum-vitamin-c',
  },
  {
    id: 't2',
    name: 'Tariq M.',
    role: 'Skin: oily, 32',
    avatar: portrait('1500648767791-00dcc994a43e'),
    title: 'Bye-bye Breakouts',
    quote:
      'The niacinamide serum finally calmed my breakouts without drying me out. My pores look visibly smaller and my skin feels balanced all day.',
    rating: 5,
    verified: true,
    productSlug: 'niacinamide-pore-serum',
  },
  {
    id: 't3',
    name: 'Lina S.',
    role: 'Skin: dry, 41',
    avatar: portrait('1438761681033-6461ffad8d80'),
    title: 'My Winter Saviour',
    quote:
      'Hydra Bloom is the only moisturizer that lasts through winter for me. My skin stays plump and hydrated even in freezing weather — no flakiness at all.',
    rating: 5,
    verified: true,
    productSlug: 'hydra-bloom-moisturizer',
  },
  {
    id: 't4',
    name: 'Maya D.',
    role: 'Skin: sensitive, 25',
    avatar: portrait('1487412720507-e7ab37603c6f'),
    title: 'So Gentle, So Good',
    quote:
      'I have rosacea and the cleanser is the gentlest I have ever used. It removes makeup without stripping and my skin feels calm and never tight after.',
    rating: 4,
    verified: true,
    productSlug: 'gentle-foam-cleanser',
  },
  {
    id: 't5',
    name: 'Ezra K.',
    role: 'Skin: normal, 36',
    avatar: portrait('1492562080023-ab3db95bfbce'),
    title: 'Daily SPF Essential',
    quote:
      'No white cast, no sting. The mineral SPF is a daily must. It sits beautifully under makeup and gives my skin a soft, healthy finish.',
    rating: 5,
    verified: true,
    productSlug: 'shield-mineral-spf-50',
  },
];
