import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, Heart, Leaf, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/constants/site';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${siteConfig.name} — our mission, our makers, and the philosophy behind every formula.`,
  path: '/about',
});

const pillars = [
  {
    icon: Leaf,
    title: 'Botanical first',
    text: 'Plant-based actives, paired with clinical science.',
  },
  { icon: Heart, title: 'Skin-kind formulas', text: "No 1,800+ ingredients we won't use, ever." },
  {
    icon: Sparkles,
    title: 'Proven results',
    text: 'Every claim is dermatologist or clinically tested.',
  },
];

export default function AboutPage() {
  return (
    <article>
      <section className="bg-cream-gradient py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Badge variant="soft" className="rounded-full">
                Our story
              </Badge>
              <h1 className="mt-4 text-balance font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
                Built for skin that lasts a lifetime.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                {siteConfig.name} began with a simple frustration: skincare that overpromised and
                underdelivered. We wanted formulas that work the way they say they will — and feel
                like a small ritual every morning.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            What we believe
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="shadow-soft rounded-3xl border bg-card p-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-olive-gradient py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight">
                The Leaf &amp; Lume Clean Promise
              </h2>
              <p className="mt-3 text-muted-foreground">
                A formula only earns the Leaf &amp; Lume name when it meets all of the below.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'No parabens',
                'No sulfates',
                'No phthalates',
                'No mineral oils',
                'No synthetic fragrance',
                'No animal testing',
                'No 1,4-dioxane',
                'No formaldehyde donors',
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 rounded-2xl bg-background/50 p-3 text-sm backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 size-4 text-primary" aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </article>
  );
}
