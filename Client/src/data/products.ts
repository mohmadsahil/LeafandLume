import type { Product } from '@/types';

/**
 * Product imagery uses Unsplash photos from the skincare collection.
 * `images.unsplash.com` is allowed in next.config.mjs.
 */
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'glow-serum-vitamin-c',
    name: 'Glow Vitamin C Serum',
    shortDescription: '10% Vitamin C + Ferulic Acid for radiant skin.',
    description:
      'A featherlight serum powered by stabilized 10% Vitamin C and Ferulic Acid. Brightens, evens tone, and protects against environmental stress for a luminous, healthy glow.',
    price: 32,
    originalPrice: 40,
    category: 'serum',
    concerns: ['dullness', 'pigmentation', 'aging'],
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Vitamin E', 'Centella'],
    size: '30 ml',
    image: img('1620916566398-39f1143ab7be'),
    images: [
      img('1620916566398-39f1143ab7be'),
      img('1570194065650-d99fb4bedf0a'),
      img('1556228720-195a672e8a03'),
    ],
    rating: 4.8,
    reviewCount: 1284,
    bestseller: true,
    isNew: false,
    benefits: ['Brightens dull skin', 'Fades dark spots', 'Boosts collagen'],
    usage: 'Apply 3–4 drops every morning on clean skin, before moisturizer and SPF.',
  },
  {
    id: 'p2',
    slug: 'hydra-bloom-moisturizer',
    name: 'Hydra Bloom Moisturizer',
    shortDescription: '72-hour hydration with hyaluronic acid + squalane.',
    description:
      'A whipped, cloud-like moisturizer that delivers up to 72 hours of hydration. 5 weights of hyaluronic acid plus squalane lock in moisture without any heaviness.',
    price: 28,
    originalPrice: 34,
    category: 'moisturizer',
    concerns: ['dryness', 'sensitivity'],
    ingredients: ['Hyaluronic Acid', 'Squalane', 'Ceramides', 'Panthenol'],
    size: '50 ml',
    image: img('1556228720-195a672e8a03'),
    images: [img('1556228720-195a672e8a03'), img('1612817288484-6f916006741a')],
    rating: 4.9,
    reviewCount: 2103,
    bestseller: true,
    benefits: ['72-hour hydration', 'Plumps fine lines', 'Strengthens barrier'],
    usage: 'Massage onto cleansed skin morning and evening as the final step before SPF.',
  },
  {
    id: 'p3',
    slug: 'gentle-foam-cleanser',
    name: 'Gentle Foam Cleanser',
    shortDescription: 'pH-balanced creamy cleanser for daily use.',
    description:
      'A sulfate-free, pH-balanced foaming cleanser that lifts away makeup, sunscreen and impurities without stripping. Formulated with green tea and centella.',
    price: 18,
    category: 'cleanser',
    concerns: ['sensitivity', 'acne'],
    ingredients: ['Green Tea', 'Centella', 'Glycerin'],
    size: '150 ml',
    image: img('1608248543803-ba4f8c70ae0b'),
    images: [img('1608248543803-ba4f8c70ae0b')],
    rating: 4.7,
    reviewCount: 942,
    isNew: true,
    benefits: ['Removes makeup gently', 'Calms redness', 'Non-stripping'],
    usage: 'Massage onto damp skin morning and evening. Rinse thoroughly.',
  },
  {
    id: 'p4',
    slug: 'shield-mineral-spf-50',
    name: 'Shield Mineral SPF 50',
    shortDescription: 'Invisible mineral sunscreen with niacinamide.',
    description:
      'A weightless, invisible mineral SPF 50 with niacinamide and aloe. No white cast, no sting — daily protection that wears beautifully under makeup.',
    price: 26,
    category: 'sunscreen',
    concerns: ['aging', 'pigmentation', 'sensitivity'],
    ingredients: ['Zinc Oxide', 'Niacinamide', 'Aloe'],
    size: '50 ml',
    image: img('1631214540242-9b58b9d2bce3'),
    images: [img('1631214540242-9b58b9d2bce3'), img('1556228852-6d35a585d566')],
    rating: 4.6,
    reviewCount: 1620,
    bestseller: true,
    benefits: ['SPF 50 PA++++', 'No white cast', 'Calms sensitive skin'],
    usage:
      'Apply two finger-lengths every morning as the last skincare step. Reapply every 2 hours.',
  },
  {
    id: 'p5',
    slug: 'midnight-repair-oil',
    name: 'Midnight Repair Face Oil',
    shortDescription: 'Restorative blend of 7 botanical oils.',
    description:
      'A nightly elixir of 7 botanical oils — rosehip, jojoba, marula, squalane, sea buckthorn, argan and bakuchiol — for deep overnight repair and a luminous wake-up glow.',
    price: 42,
    category: 'oil',
    concerns: ['dryness', 'aging', 'dullness'],
    ingredients: ['Rosehip', 'Jojoba', 'Bakuchiol', 'Marula'],
    size: '30 ml',
    image: img('1570194065650-d99fb4bedf0a'),
    images: [img('1570194065650-d99fb4bedf0a')],
    rating: 4.9,
    reviewCount: 778,
    isNew: true,
    benefits: ['Restores overnight', 'Softens fine lines', 'Plant-based retinol alternative'],
    usage: 'Warm 3–5 drops between palms and press onto cleansed skin at night.',
  },
  {
    id: 'p6',
    slug: 'clarity-clay-mask',
    name: 'Clarity Clay Mask',
    shortDescription: 'Kaolin + charcoal pore-clearing weekly treatment.',
    description:
      'A creamy clay mask that gently draws out impurities while staying soft and non-drying. Kaolin and charcoal detox, while niacinamide refines pores.',
    price: 24,
    category: 'mask',
    concerns: ['acne', 'dullness'],
    ingredients: ['Kaolin', 'Charcoal', 'Niacinamide'],
    size: '75 ml',
    image: img('1598440947619-2c35fc9aa908'),
    images: [img('1598440947619-2c35fc9aa908')],
    rating: 4.5,
    reviewCount: 432,
    benefits: ['Decongests pores', 'Smooths texture', 'Non-drying'],
    usage: 'Apply a thin layer to clean skin 1–2× weekly. Leave on 10 minutes and rinse.',
  },
  {
    id: 'p7',
    slug: 'niacinamide-pore-serum',
    name: 'Niacinamide 10% Serum',
    shortDescription: 'Pore-refining serum with zinc PCA.',
    description:
      '10% niacinamide and 1% zinc PCA work to refine pores, balance oil and even tone. Lightweight, fast-absorbing and layerable.',
    price: 22,
    originalPrice: 28,
    category: 'serum',
    concerns: ['acne', 'pigmentation'],
    ingredients: ['Niacinamide', 'Zinc PCA'],
    size: '30 ml',
    image: img('1612817288484-6f916006741a'),
    images: [img('1612817288484-6f916006741a')],
    rating: 4.7,
    reviewCount: 1150,
    bestseller: true,
    benefits: ['Visibly refines pores', 'Balances oil', 'Evens tone'],
    usage: 'Apply 3–4 drops AM and PM after cleansing, before moisturizer.',
  },
  {
    id: 'p8',
    slug: 'dew-drop-eye-cream',
    name: 'Dew Drop Eye Cream',
    shortDescription: 'Caffeine + peptide eye cream for puffiness.',
    description:
      'A cool, depuffing eye cream with caffeine, peptides and cucumber extract. Brightens dark circles and softens fine lines from the first use.',
    price: 30,
    category: 'moisturizer',
    concerns: ['aging', 'dullness'],
    ingredients: ['Caffeine', 'Peptides', 'Cucumber'],
    size: '15 ml',
    image: img('1571781926291-c477ebfd024b'),
    images: [img('1571781926291-c477ebfd024b')],
    rating: 4.6,
    reviewCount: 596,
    isNew: true,
    benefits: ['Depuffs', 'Brightens', 'Hydrates'],
    usage: 'Pat a pea-sized amount around the orbital bone morning and evening.',
  },
];

export const findProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const bestsellers = () => products.filter((p) => p.bestseller);
export const newArrivals = () => products.filter((p) => p.isNew);
export const productsByCategory = (cat: Product['category']) =>
  products.filter((p) => p.category === cat);
export const productsByConcern = (concern: Product['concerns'][number]) =>
  products.filter((p) => p.concerns.includes(concern));
