'use client';

import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { promoBanners } from '@/data/hero-slides';
import { cn } from '@/lib/utils';

export function PromoBanners() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  return (
    <section aria-label="Promotions" className="py-8 sm:py-12">
      <Container>
        <Carousel opts={{ loop: true }} plugins={[autoplay.current]}>
          <CarouselContent className="-ml-3">
            {promoBanners.map((banner) => (
              <CarouselItem key={banner.id} className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3">
                <Link
                  href={banner.cta.href}
                  className={cn(
                    'shadow-soft group relative flex h-44 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-5 transition-transform hover:-translate-y-1 sm:h-48',
                    banner.gradient,
                  )}
                >
                  <div>
                    <Badge className="rounded-full bg-foreground/90 text-background backdrop-blur">
                      {banner.label}
                    </Badge>
                    <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                      {banner.title}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <p className="max-w-[70%] text-xs text-foreground/70 sm:text-sm">
                      {banner.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-all group-hover:gap-2">
                      {banner.cta.label} <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
}
