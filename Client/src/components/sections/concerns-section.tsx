import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { concerns } from '@/data/concerns';

export function ConcernsSection() {
  return (
    <section id="concerns" aria-labelledby="concerns-heading" className="relative py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          {/* Left: editorial header */}
          <div className="lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Solve for
            </p>
            <h2
              id="concerns-heading"
              className="mt-3 text-balance font-heading text-3xl font-semibold leading-[1.05] tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl"
            >
              Tell us what your <em className="font-normal italic text-primary">skin</em> needs1.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base lg:text-lg">
              Targeted formulas, mapped to the things that actually bother you — from everyday
              dryness to deeper concerns, there&apos;s an answer for each.
            </p>

            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden />
              <span>{concerns.length} skin concerns covered</span>
            </div>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center gap-3" aria-hidden>
              <div className="h-px w-12 bg-primary/40" />
              <div className="size-1.5 rounded-full bg-primary/40" />
              <div className="h-px flex-1 bg-foreground/10" />
            </div>

            <Button asChild size="lg" className="mt-7 rounded-full px-6">
              <Link href="/quiz">
                Take the 60-sec skin quiz
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Earn Glow Points · Dermatologist-vetted · 100% free.
            </p>
          </div>

          {/* Right: monochrome card grid */}
          <ul className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4">
            {concerns.map((c, i) => {
              const Icon = c.icon;
              return (
                <li key={c.id}>
                  <Link
                    href={`/shop?concern=${c.slug}`}
                    className="shadow-soft hover:shadow-luxury group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-6"
                  >
                    {/* Big italic number watermark */}
                    <span
                      aria-hidden
                      className="absolute right-3 top-2 font-heading text-7xl font-semibold italic leading-none text-foreground/[0.06] sm:text-8xl"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Organic blob behind icon */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -left-5 top-3 size-24 bg-primary/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
                      style={{
                        borderRadius: '60% 40% 55% 45% / 50% 60% 45% 55%',
                      }}
                    />

                    {/* Second tiny blob accent */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-8 right-6 size-3 rounded-full bg-primary/40"
                    />

                    {/* Icon */}
                    <span
                      aria-hidden
                      className="relative grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Icon className="size-5" />
                    </span>

                    {/* Title + description */}
                    <div className="relative mt-5">
                      <h3 className="font-heading text-lg font-semibold italic tracking-tight sm:text-xl">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {c.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="relative mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-foreground/70 transition-colors group-hover:text-primary">
                      Explore
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
