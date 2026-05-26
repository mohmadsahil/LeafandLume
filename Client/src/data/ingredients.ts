import type { Ingredient } from '@/types';

export const ingredients: Ingredient[] = [
  {
    id: 'i1',
    name: 'Niacinamide',
    description:
      'A form of vitamin B3 that regulates oil, refines pores and visibly evens tone. The most well-studied multitasker in modern skincare.',
    benefit: 'Refines pores',
    emoji: '🌿',
    color: 'bg-emerald-50',
    concentration: '10%',
    howItWorks: [
      'Reduces sebum production for visibly smaller pores',
      'Strengthens the lipid barrier to lock in hydration',
      'Fades post-blemish marks over 4–8 weeks of daily use',
    ],
  },
  {
    id: 'i2',
    name: 'Vitamin C',
    description:
      'A powerhouse antioxidant that neutralizes free radicals, brightens dullness and supercharges collagen for a lit-from-within glow.',
    benefit: 'Brightens',
    emoji: '🍊',
    color: 'bg-amber-50',
    concentration: '10%',
    howItWorks: [
      'Neutralizes free radicals from UV light and pollution',
      'Brightens dull skin and visibly fades dark spots',
      'Stimulates collagen for firmer, plumper skin',
    ],
  },
  {
    id: 'i3',
    name: 'Hyaluronic Acid',
    description:
      'A naturally occurring sugar molecule that holds up to 1000× its weight in water. The benchmark for instant, lasting hydration.',
    benefit: 'Hydrates',
    emoji: '💧',
    color: 'bg-sky-50',
    concentration: '1%',
    howItWorks: [
      'Holds up to 1000× its weight in water',
      'Plumps fine lines from the inside out',
      'Layers seamlessly under any cream or oil',
    ],
  },
  {
    id: 'i4',
    name: 'Retinol',
    description:
      'The gold-standard form of vitamin A. Speeds cellular turnover for smoother texture, fewer lines and a more even, refined surface.',
    benefit: 'Renews',
    emoji: '✨',
    color: 'bg-rose-50',
    concentration: '0.5%',
    howItWorks: [
      'Accelerates cell turnover for smoother texture',
      'Visibly softens fine lines and wrinkles over time',
      'Refines pores and evens skin tone night after night',
    ],
  },
  {
    id: 'i5',
    name: 'Centella',
    description:
      'A calming Asian botanical (also known as Cica) clinically shown to soothe redness, strengthen the barrier and speed up healing.',
    benefit: 'Calms',
    emoji: '🌱',
    color: 'bg-lime-50',
    concentration: '2%',
    howItWorks: [
      'Calms irritation, redness, and inflammation',
      'Strengthens a compromised skin barrier',
      'Speeds recovery from breakouts and procedures',
    ],
  },
  {
    id: 'i6',
    name: 'Squalane',
    description:
      "A plant-derived oil that mirrors the skin's own sebum. Locks in moisture and softens texture without ever feeling heavy.",
    benefit: 'Seals',
    emoji: '🫧',
    color: 'bg-stone-100',
    concentration: '100%',
    howItWorks: [
      "Mimics the skin's own natural oils",
      'Locks in moisture without clogging pores',
      'Suitable for every skin type — including oily',
    ],
  },
];
