import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { TrendingProducts } from '@/components/sections/trending-products';
import { BestSellers } from '@/components/sections/best-sellers';
import { ReelsSection } from '@/components/sections/reels-section';
import { CategorySlider } from '@/components/sections/category-slider';
import { ConcernsSection } from '@/components/sections/concerns-section';
import { IngredientsSection } from '@/components/sections/ingredients-section';
import { RoutineSection } from '@/components/sections/routine-section';
import { Testimonials } from '@/components/sections/testimonials';
import { InstagramGallery } from '@/components/sections/instagram-gallery';
import { BotanicalsBackdrop } from '@/components/layout/botanicals-backdrop';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Botanical skincare, beautifully crafted',
  description:
    'Discover Leaf & Lume — premium, clean, science-backed botanical skincare designed for radiant, healthy skin.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrendingProducts />
      <BestSellers />
      <ReelsSection />
      {/* <PromoBanners /> */}
      <CategorySlider />
      <BotanicalsBackdrop>
        <ConcernsSection />
        <IngredientsSection />
        <RoutineSection />
      </BotanicalsBackdrop>
      <Testimonials />
      <InstagramGallery />
    </>
  );
}
