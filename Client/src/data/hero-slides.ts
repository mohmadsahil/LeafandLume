export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  image: string;
  tint: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'h1',
    eyebrow: 'New · Glow Edit',
    title: 'Skin that\nspeaks for itself.',
    subtitle: 'Botanical formulas, clinically proven. Designed for everyday radiance.',
    cta: { label: 'Shop the edit', href: '/shop?filter=new' },
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
    tint: 'from-amber-100/70 via-amber-50/50 to-transparent',
  },
  {
    id: 'h2',
    eyebrow: 'Bestseller',
    title: 'Hydra Bloom\n— 72h hydration.',
    subtitle: 'A cloud-light moisturizer that hydrates for three days straight.',
    cta: { label: 'Shop Hydra Bloom', href: '/product/hydra-bloom-moisturizer' },
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    tint: 'from-rose-100/70 via-rose-50/50 to-transparent',
  },
  {
    id: 'h3',
    eyebrow: 'Mineral SPF',
    title: 'Sun, sealed in\ngood feeling.',
    subtitle: "Invisible, weightless SPF 50 you'll actually want to reapply.",
    cta: { label: 'Shop Shield SPF', href: '/product/shield-mineral-spf-50' },
    image:
      'https://images.unsplash.com/photo-1631214540242-9b58b9d2bce3?auto=format&fit=crop&w=1400&q=85',
    tint: 'from-sky-100/70 via-sky-50/50 to-transparent',
  },
];

export interface PromoBanner {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  gradient: string;
}

export const promoBanners: PromoBanner[] = [
  {
    id: 'pb1',
    label: 'Limited drop',
    title: 'Build your routine, save 15%',
    description: 'Add any two products to your bag and BUNDLE15 applies automatically.',
    cta: { label: 'Build a routine', href: '/shop' },
    gradient: 'from-emerald-200/80 via-amber-50 to-rose-100/80',
  },
  {
    id: 'pb2',
    label: 'Free gift',
    title: 'A travel duo on us over $80',
    description: 'Our Hydra Bloom mini + Gentle Cleanser mini, free with every order over $80.',
    cta: { label: 'Shop now', href: '/shop' },
    gradient: 'from-rose-200/80 via-amber-100 to-orange-100/80',
  },
  {
    id: 'pb3',
    label: 'New launch',
    title: 'Meet Dew Drop eye cream',
    description: 'Caffeine + peptides to depuff and brighten — in seconds.',
    cta: { label: 'Explore', href: '/product/dew-drop-eye-cream' },
    gradient: 'from-sky-200/80 via-emerald-50 to-amber-100/80',
  },
];

export type Ampm = 'AM' | 'PM' | 'AM + PM';

export interface RoutineStep {
  step: string;
  title: string;
  desc: string;
  productSlug: string;
  time: string;
  ampm: Ampm;
}

export const routineSteps: RoutineStep[] = [
  {
    step: '01',
    title: 'Cleanse',
    desc: 'Gentle Foam Cleanser melts away the day without stripping.',
    productSlug: 'gentle-foam-cleanser',
    time: '1 min',
    ampm: 'AM + PM',
  },
  {
    step: '02',
    title: 'Treat',
    desc: 'Glow Vitamin C in AM, Midnight Repair Oil in PM.',
    productSlug: 'glow-serum-vitamin-c',
    time: '30 sec',
    ampm: 'AM + PM',
  },
  {
    step: '03',
    title: 'Hydrate',
    desc: 'Hydra Bloom locks in moisture for 72 hours.',
    productSlug: 'hydra-bloom-moisturizer',
    time: '30 sec',
    ampm: 'AM + PM',
  },
  {
    step: '04',
    title: 'Protect',
    desc: 'Shield Mineral SPF 50 finishes every morning.',
    productSlug: 'shield-mineral-spf-50',
    time: '1 min',
    ampm: 'AM',
  },
];

export const instagramPosts = [
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1631214540242-9b58b9d2bce3?auto=format&fit=crop&w=400&q=80',
];
