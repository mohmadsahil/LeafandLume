'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Beaker, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ingredients } from '@/data/ingredients';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

export function IngredientsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ingredients[activeIdx] ?? ingredients[0]!;

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const ing of ingredients) {
      map[ing.id] = products.filter((p) =>
        p.ingredients.some((i) => i.toLowerCase() === ing.name.toLowerCase()),
      ).length;
    }
    return map;
  }, []);

  const activeCount = counts[active.id] ?? 0;

  return (
    <section
      id="ingredients"
      aria-labelledby="ingredients-heading"
      className="relative py-16 sm:py-20"
    >
      <Container>
        <div className="text-center">
          <SectionHeader
            eyebrow="Hero ingredients"
            title="Backed by science, sourced from nature"
            description="Every formula is built around clinically proven, traceable actives — at concentrations that actually work."
            align="center"
          />
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
            <Beaker className="size-3.5" aria-hidden />
            <span>{ingredients.length} clinically proven actives</span>
          </div>
        </div>

        {/* Tab strip */}
        <div
          role="tablist"
          aria-label="Hero ingredients"
          className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {ingredients.map((ing, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={ing.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(i)}
                suppressHydrationWarning
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'shadow-soft border-foreground bg-foreground text-background'
                    : 'border-border bg-background/70 backdrop-blur hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary',
                )}
              >
                <span className="text-base leading-none">{ing.emoji}</span>
                {ing.name}
              </button>
            );
          })}
        </div>

        {/* Editorial showcase card */}
        <article className="shadow-luxury mt-8 grid grid-cols-1 overflow-hidden rounded-[2rem] border bg-background lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: visual showcase */}
          <div
            className={cn(
              'relative h-48 overflow-hidden transition-colors duration-500 sm:h-60 md:h-72 lg:h-auto lg:min-h-[340px]',
              active.color,
            )}
          >
            {/* Concentric rings */}
            {[88, 64, 44, 26].map((pct) => (
              <div
                key={pct}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10"
                style={{ width: `${pct}%`, height: `${pct}%` }}
              />
            ))}

            {/* Scattered "molecule" dots */}
            {[
              { top: '12%', left: '18%' },
              { top: '22%', right: '14%' },
              { bottom: '18%', left: '10%' },
              { bottom: '24%', right: '22%' },
              { top: '50%', left: '6%' },
              { top: '8%', right: '40%' },
            ].map((pos, i) => (
              <span
                key={i}
                aria-hidden
                style={pos as React.CSSProperties}
                className="absolute size-2 rounded-full bg-foreground/15 sm:size-2.5"
              />
            ))}

            {/* Soft inner glow */}
            <div aria-hidden className="absolute inset-[18%] rounded-full bg-white/50 blur-3xl" />

            {/* Animated emoji + ring */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="relative text-[5rem] drop-shadow-md sm:text-[6rem] lg:text-[8rem]">
                  {active.emoji}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Concentration badge */}
            {active.concentration && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`conc-${active.id}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="shadow-soft absolute right-4 top-4 rounded-full bg-foreground px-2.5 py-1 font-heading text-xs font-semibold italic text-background"
                >
                  {active.concentration}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Clinically tested stamp */}
            <div className="shadow-soft absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold text-foreground backdrop-blur">
              <ShieldCheck className="size-3 text-primary" aria-hidden />
              Clinically tested
            </div>
          </div>

          {/* Right: content */}
          <div className="relative flex flex-col p-5 sm:p-6 lg:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Hero ingredient · {String(activeIdx + 1).padStart(2, '0')} /{' '}
                  {String(ingredients.length).padStart(2, '0')}
                </p>
                <h3
                  id="ingredients-heading"
                  className="mt-1.5 font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
                >
                  {active.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {active.description}
                </p>

                {active.howItWorks && active.howItWorks.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
                      How it works
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {active.howItWorks.map((line, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs leading-relaxed sm:text-sm"
                        >
                          <span
                            aria-hidden
                            className="mt-1 grid size-3.5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"
                          >
                            <Check className="size-2.5" />
                          </span>
                          <span className="text-foreground/85">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  <Badge variant="soft" className="rounded-full">
                    <Sparkles className="mr-1 size-3" aria-hidden />
                    {active.benefit}
                  </Badge>
                  {activeCount > 0 ? (
                    <Link
                      href={`/shop?ing=${active.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Found in {activeCount} {activeCount === 1 ? 'product' : 'products'}
                      <ArrowUpRight className="size-3" aria-hidden />
                    </Link>
                  ) : (
                    <Badge variant="outline" className="rounded-full">
                      Coming soon
                    </Badge>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </article>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/shop">
              Shop by ingredient
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Clinically tested · Sustainably sourced · Fragrance-free options available
          </p>
        </div>
      </Container>
    </section>
  );
}
