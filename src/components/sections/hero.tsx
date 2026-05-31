'use client';

import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Container } from '@/components/layout/container';
import { heroSlides } from '@/data/hero-slides';
import { cn } from '@/lib/utils';

export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <section aria-label="Featured collections" className="relative">
      <Carousel opts={{ loop: true }} plugins={[autoplay.current]} className="relative">
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide, i) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative h-[78vh] min-h-[460px] w-full overflow-hidden sm:min-h-[520px] md:h-[88vh]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className={cn('absolute inset-0 bg-gradient-to-br', slide.tint)} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent md:bg-gradient-to-r md:from-background/85 md:via-background/40 md:to-transparent" />

                <Container className="relative flex h-full items-end pb-12 md:items-center md:pb-0">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-xl"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80 backdrop-blur">
                      <Sparkles className="size-3 text-primary" aria-hidden />
                      {slide.eyebrow}
                    </span>
                    <h1 className="mt-4 whitespace-pre-line text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-tight xs:text-4xl sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>
                    <p className="mt-3 max-w-md text-sm text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
                      {slide.subtitle}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
                      <Button asChild size="lg" className="rounded-full">
                        <Link href={slide.cta.href}>
                          {slide.cta.label} <ArrowRight />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="rounded-full text-foreground"
                      >
                        <Link href="/shop">Explore all</Link>
                      </Button>
                    </div>
                  </motion.div>
                </Container>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 hidden sm:left-4 sm:inline-flex" />
        <CarouselNext className="right-2 hidden sm:right-4 sm:inline-flex" />
      </Carousel>
    </section>
  );
}
