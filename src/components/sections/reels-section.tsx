'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { ReelCard } from '@/components/reels/reel-card';
import { reels } from '@/data/reels';
import { findProductBySlug } from '@/data/products';
import { cn } from '@/lib/utils';

export function ReelsSection() {
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false, skipSnaps: false },
    [autoplay.current],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section aria-labelledby="reels" className="py-12 sm:py-16">
      <Container>
        <SectionHeader
          align="center"
          title="Watch It. Love It."
          description="Real routines, real glow. Tap a clip to shop the look."
        />
      </Container>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex items-start pb-6">
          {reels.map((reel, i) => {
            const product = findProductBySlug(reel.productSlug);
            const isActive = i === selectedIndex;
            return (
              <div
                key={reel.id}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  'flex shrink-0 grow-0 basis-[60%] cursor-pointer justify-center px-2 sm:basis-[44%] md:basis-[32%] lg:basis-[26%]',
                  !isActive && 'cursor-pointer',
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                <ReelCard reel={reel} product={product} isActive={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5">
        {reels.map((reel, i) => (
          <button
            key={reel.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to reel ${i + 1}`}
            className={cn(
              'h-1.5 rounded-full bg-foreground/20 transition-all',
              i === selectedIndex ? 'w-6 bg-primary' : 'w-1.5 hover:bg-foreground/40',
            )}
          />
        ))}
      </div>
    </section>
  );
}
