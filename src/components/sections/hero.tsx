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
              <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden md:h-[88vh]">
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
                    <h1 className="mt-5 whitespace-pre-line text-balance font-heading text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
                      {slide.subtitle}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
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
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}
