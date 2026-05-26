'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { BadgeCheck, ChevronsRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { RatingStars } from '@/components/common/rating-stars';
import { testimonials } from '@/data/testimonials';
import { findProductBySlug } from '@/data/products';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
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
    <section aria-labelledby="testimonials" className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Glow stories"
          title="48,000 5-star reviews and counting"
          description="Real skin, real results — from real customers."
          align="center"
        />
      </Container>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex items-stretch pb-4">
          {testimonials.map((t, i) => {
            const product = t.productSlug ? findProductBySlug(t.productSlug) : undefined;
            const firstName = t.name.split(' ')[0];
            const isActive = i === selectedIndex;
            return (
              <div
                key={t.id}
                onClick={() => emblaApi?.scrollTo(i)}
                className="flex shrink-0 grow-0 basis-[88%] cursor-pointer justify-center px-2 xs:basis-[78%] sm:basis-[55%] md:basis-[42%] lg:basis-[32%]"
                aria-current={isActive ? 'true' : undefined}
              >
                <motion.figure
                  animate={{
                    scale: isActive ? 1 : 0.88,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'shadow-soft flex h-full w-full max-w-sm flex-col rounded-3xl border bg-background p-5 sm:p-6',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-secondary ring-1 ring-border/60">
                      <Image src={t.avatar} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-heading text-xs font-bold uppercase tracking-wide text-foreground sm:text-sm">
                        {t.name}
                      </p>
                      {t.verified && (
                        <BadgeCheck
                          className="size-4 fill-sky-500 text-background"
                          aria-label="Verified buyer"
                        />
                      )}
                    </div>
                  </div>

                  <RatingStars value={t.rating} size={16} className="mt-4 gap-0.5" />

                  {t.title && (
                    <h3 className="mt-2.5 font-heading text-base font-bold text-foreground">
                      {t.title}
                    </h3>
                  )}

                  <blockquote className="mt-1.5 flex-1 text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {t.quote}
                  </blockquote>

                  {product && (
                    <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative size-11 shrink-0 overflow-hidden rounded-full bg-rose-100/70"
                        aria-label={product.name}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-muted-foreground">
                          {firstName} Recommends This Product
                        </p>
                        <Link
                          href={`/product/${product.slug}`}
                          tabIndex={isActive ? 0 : -1}
                          className="mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-bold uppercase tracking-wide text-rose-600 underline underline-offset-4 hover:text-rose-700"
                        >
                          Shop now
                          <ChevronsRight className="size-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.figure>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
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
