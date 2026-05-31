import type { Reel } from '@/types';

const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
];

export const reels: Reel[] = [
  {
    id: 'r1',
    thumbnail:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
    videoUrl: SAMPLE_VIDEOS[0],
    caption: 'My 3-step glow routine ✨',
    author: '@melinahmd',
    productSlug: 'glow-serum-vitamin-c',
    likes: 12_400,
  },
  {
    id: 'r2',
    thumbnail:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    videoUrl: SAMPLE_VIDEOS[1],
    caption: 'POV: You finally found the right serum',
    author: '@dr.sana',
    productSlug: 'niacinamide-pore-serum',
    likes: 8_900,
  },
  {
    id: 'r3',
    thumbnail:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
    videoUrl: SAMPLE_VIDEOS[2],
    caption: 'Cloud-cream review (no filter)',
    author: '@leah.skin',
    productSlug: 'hydra-bloom-moisturizer',
    likes: 21_300,
  },
  {
    id: 'r4',
    thumbnail:
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80',
    videoUrl: SAMPLE_VIDEOS[3],
    caption: 'My PM routine, ranked',
    author: '@oliveinwild',
    productSlug: 'midnight-repair-oil',
    likes: 14_120,
  },
  {
    id: 'r5',
    thumbnail:
      'https://images.unsplash.com/photo-1556228852-6d35a585d566?auto=format&fit=crop&w=400&q=80',
    videoUrl: SAMPLE_VIDEOS[4],
    caption: '60 sec sunscreen test ☀️',
    author: '@petalpath',
    productSlug: 'shield-mineral-spf-50',
    likes: 9_640,
  },
  {
    id: 'r6',
    thumbnail:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
    videoUrl: SAMPLE_VIDEOS[5],
    caption: 'Sunday self-care 🧖🏽‍♀️',
    author: '@haveakind',
    productSlug: 'clarity-clay-mask',
    likes: 7_200,
  },
];
