import { Droplet, Flame, Leaf, Sparkles, Sun, Wind } from 'lucide-react';
import type { Concern } from '@/types';

export const concerns: Concern[] = [
  {
    id: 'cn1',
    slug: 'dryness',
    title: 'Dryness',
    description: 'Plump, hydrate, and seal in moisture.',
    icon: Droplet,
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'cn2',
    slug: 'dullness',
    title: 'Dullness',
    description: 'Wake up tired skin with a glow boost.',
    icon: Sparkles,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'cn3',
    slug: 'pigmentation',
    title: 'Pigmentation',
    description: 'Fade dark spots and even tone.',
    icon: Sun,
    color: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'cn4',
    slug: 'acne',
    title: 'Acne',
    description: 'Clear breakouts, refine pores.',
    icon: Flame,
    color: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'cn5',
    slug: 'aging',
    title: 'Anti-aging',
    description: 'Smooth fine lines and firm skin.',
    icon: Leaf,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'cn6',
    slug: 'sensitivity',
    title: 'Sensitivity',
    description: 'Calm redness, strengthen barrier.',
    icon: Wind,
    color: 'bg-purple-100 text-purple-700',
  },
];
