'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock, Moon, Sparkles, Sun } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { routineSteps, type Ampm } from '@/data/hero-slides';
import { findProductBySlug } from '@/data/products';
import { cn } from '@/lib/utils';

const ampmIcon: Record<Ampm, typeof Sun> = {
  AM: Sun,
  PM: Moon,
  'AM + PM': Sparkles,
};

export function RoutineSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  return (
    <section id="routine" aria-labelledby="routine-heading" className="relative py-16 sm:py-20">
      <Container>
        <div className="text-center">
          <SectionHeader
            eyebrow="The daily ritual"
            title="A 4-step routine, in under 4 minutes"
            description="Morning. Evening. That's it. No 12-step gimmicks."
            align="center"
          />
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
            <Clock className="size-3.5" aria-hidden />
            <span>≈ 3 min total</span>
          </div>
        </div>

        {/* Carousel: one compact card visible, full width within container */}
        <div className="relative mx-auto mt-10 max-w-3xl">
          <Carousel opts={{ loop: true, align: 'center' }} setApi={setApi}>
            <CarouselContent className="ml-0">
              {routineSteps.map((step) => {
                const product = findProductBySlug(step.productSlug);
                const Icon = ampmIcon[step.ampm];
                return (
                  <CarouselItem key={step.step} className="pl-0">
                    <article className="shadow-soft grid grid-cols-[88px_1fr] items-center gap-3 rounded-3xl border bg-background p-3 xs:grid-cols-[112px_1fr] xs:gap-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:p-5">
                      {/* Image */}
                      {product && (
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 120px, 200px"
                            className="object-cover"
                          />
                          <Badge
                            variant="outline"
                            className="absolute right-1.5 top-1.5 gap-1 rounded-full border-foreground/10 bg-background/85 px-1.5 py-0.5 text-[9px] backdrop-blur sm:right-2 sm:top-2 sm:px-2 sm:text-[10px]"
                          >
                            <Icon className="size-2.5 sm:size-3" aria-hidden /> {step.ampm}
                          </Badge>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex min-w-0 flex-col gap-1.5 pr-1 sm:gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-2xl font-semibold italic leading-none text-primary sm:text-3xl">
                            {step.step}
                          </span>
                          <h3 className="font-heading text-base font-semibold tracking-tight sm:text-xl">
                            {step.title}
                          </h3>
                          <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            <Clock className="size-2.5" aria-hidden /> {step.time}
                          </span>
                        </div>

                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {step.desc}
                        </p>

                        {product && (
                          <Link
                            href={`/product/${product.slug}`}
                            className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:text-xs"
                          >
                            Shop {product.name}
                            <ArrowUpRight className="size-3" aria-hidden />
                          </Link>
                        )}
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Floating arrows centered vertically on the card */}
            <CarouselPrevious
              aria-label="Previous step"
              className="left-0 flex size-8 -translate-x-1/2 sm:size-10"
            />
            <CarouselNext
              aria-label="Next step"
              className="right-0 flex size-8 translate-x-1/2 sm:size-10"
            />
          </Carousel>

          {/* Step indicator dots */}
          <div
            className="mt-5 flex justify-center gap-1.5"
            role="tablist"
            aria-label="Routine steps"
          >
            {routineSteps.map((s, i) => {
              const active = current === i;
              return (
                <button
                  key={s.step}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    active ? 'w-7 bg-primary' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40',
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/shop">
              Shop the full routine
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Save 15% on any 2+ products with code{' '}
            <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-foreground">
              BUNDLE15
            </code>
          </p>
        </div>
      </Container>
    </section>
  );
}
