import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Beaker,
  CheckCircle2,
  Heart,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sprout,
  Sun,
  TestTube2,
  TreePine,
  Truck,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/constants/site';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${siteConfig.name} — certified-organic, plant-first skincare crafted in small batches with traceable farm-to-face ingredients.`,
  path: '/about',
});

const heroStats = [
  { label: 'Organic actives', value: '98%' },
  { label: 'Partner farms', value: '24' },
  { label: 'Small-batch yield', value: '<450' },
];

const pillars = [
  {
    icon: Leaf,
    title: 'Botanical first',
    text: 'Cold-pressed oils, fresh hydrosols, and whole-plant extracts replace synthetic fillers — never the other way around.',
  },
  {
    icon: Sprout,
    title: 'Regenerative sourcing',
    text: 'We partner with regenerative and biodynamic farms that build topsoil, sequester carbon, and protect pollinators.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinically honest',
    text: 'Every active is dosed at the concentration studied — and every claim is backed by independent dermatological testing.',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'A kitchen in Brooklyn',
    body: 'Founder Aanya Rao starts blending botanicals at her kitchen counter after a year-long elimination diet of her own routine.',
  },
  {
    year: '2020',
    title: 'First COSMOS-certified serum',
    body: 'Our debut Sea Buckthorn + Squalane serum earns COSMOS Organic certification — formulated with 99.2% naturally derived ingredients.',
  },
  {
    year: '2023',
    title: 'Farm partnerships go global',
    body: '24 family-run farms across India, Morocco, Bulgaria and the Pacific Northwest become our direct-trade supply network.',
  },
  {
    year: '2026',
    title: 'Carbon-neutral & refillable',
    body: 'Every order ships carbon-neutral, and 70% of our hero SKUs are available as glass refills — saving an estimated 38 tonnes of plastic this year.',
  },
];

const journey = [
  {
    icon: Sprout,
    title: 'Seed & soil',
    body: 'Heirloom seeds planted on regenerative farms; no synthetic pesticides, no GMOs, no monocropping.',
  },
  {
    icon: Sun,
    title: 'Slow harvest',
    body: 'Hand-picked at peak phytonutrient density — usually within a two-week annual window per ingredient.',
  },
  {
    icon: Leaf,
    title: 'Cold-pressed',
    body: 'Pressed below 27°C to preserve antioxidants, polyphenols and essential fatty acids that heat would destroy.',
  },
  {
    icon: TestTube2,
    title: 'Lab + dermatologist',
    body: 'Formulated with our in-house chemists, then patch-tested on a panel of 60 across skin tones and sensitivities.',
  },
  {
    icon: Recycle,
    title: 'Hand-filled & refillable',
    body: 'Filled in batches under 450 units into post-consumer glass with refill pouches that use 82% less material.',
  },
];

const ingredients = [
  {
    name: 'Sea buckthorn',
    origin: 'Himalayan foothills, India',
    cert: 'COSMOS Organic',
    body: 'Cold-pressed berries deliver omega-7, vitamin C and beta-carotene — our hero brightening lipid.',
  },
  {
    name: 'Bakuchiol',
    origin: 'Tamil Nadu, India',
    cert: 'Ecocert · plant-derived',
    body: 'A pregnancy-safe alternative to retinol from Babchi seeds. Smooths fine lines without sensitising the barrier.',
  },
  {
    name: 'Centella asiatica',
    origin: 'Madagascar smallholders',
    cert: 'Fair for Life',
    body: 'Wild-harvested cica calms redness and supports a stronger lipid barrier within 14 days of use.',
  },
  {
    name: 'Damask rose hydrosol',
    origin: 'Valley of Roses, Bulgaria',
    cert: 'EU Organic',
    body: 'Steam-distilled within 6 hours of picking — never reconstituted from concentrates or rose oil dilutions.',
  },
  {
    name: 'Argan oil',
    origin: "Berber women's co-op, Morocco",
    cert: 'Fair-trade · USDA Organic',
    body: 'First-cold-press, unroasted argan — rich in vitamin E, with full traceability to a single cooperative.',
  },
  {
    name: 'Green tea polyphenols',
    origin: 'Shizuoka shade-grown tea, Japan',
    cert: 'JAS Organic',
    body: 'EGCG concentrate that neutralises free radicals — paired with vitamin C for next-level antioxidant defence.',
  },
];

const cleanPromise = {
  Synthetics: [
    'No parabens',
    'No sulfates (SLS / SLES)',
    'No phthalates',
    'No PEGs',
    'No silicones',
    'No mineral oils',
  ],
  Irritants: [
    'No synthetic fragrance',
    'No dyes or colourants',
    'No formaldehyde donors',
    'No 1,4-dioxane',
    'No drying alcohols',
  ],
  'Planet & people': [
    'Cruelty-free, always',
    'Vegan formulas (no beeswax, lanolin)',
    'RSPO-certified palm-free',
    'Microplastic-free',
    'Reef-safe SPF actives',
  ],
};

const certifications = [
  { label: 'COSMOS Organic', detail: 'Internationally recognised organic & natural standard' },
  { label: 'Leaping Bunny', detail: 'No animal testing at any stage, ever' },
  { label: 'B Corp', detail: 'Independently audited social & environmental impact' },
  { label: 'EWG Verified', detail: 'Full transparency on every ingredient' },
  { label: 'Vegan Society', detail: 'Zero animal-derived ingredients across the range' },
  { label: 'Climate Neutral', detail: 'Operational + supply-chain emissions offset annually' },
];

const impact = [
  { value: '98%', label: 'Naturally derived ingredients across the range' },
  { value: '24', label: 'Direct-trade farms in our supply network' },
  { value: '82%', label: 'Less packaging material when you choose refills' },
  { value: '12,400', label: 'Trees planted with One Tree Planted (and counting)' },
];

export default function AboutPage() {
  return (
    <article>
      {/* Hero */}
      <section className="bg-cream-gradient relative overflow-hidden py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 size-72 rounded-full bg-primary/20 blur-3xl"
        />
        <Container>
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Badge variant="soft" className="rounded-full">
                <Leaf className="mr-1 size-3" /> Certified-organic skincare
              </Badge>
              <h1 className="mt-4 text-balance font-heading text-3xl font-semibold leading-[1.05] tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl">
                Skincare grown the{' '}
                <em className="font-normal italic text-primary">slow, honest</em> way.
              </h1>
              <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base lg:text-lg">
                {siteConfig.name} is a small, independent skincare house built on a single rule:
                if it isn&apos;t safe enough for the soil, it doesn&apos;t belong on your skin.
                Every formula is cold-pressed, batch-tested, and traceable to the farm that grew
                it.
              </p>

              <dl className="mt-7 grid max-w-md grid-cols-3 gap-3">
                {heroStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-primary/15 bg-background/60 p-3 backdrop-blur"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-heading text-2xl font-semibold tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/shop">
                    Explore the range
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href="/#ingredients">Meet our actives</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80"
                  alt="A cluster of fresh botanicals beside an amber glass bottle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="shadow-luxury absolute -bottom-5 -left-5 hidden max-w-[14rem] rounded-2xl border bg-background/95 p-4 backdrop-blur sm:block">
                <div className="flex items-center gap-2">
                  <Award className="size-5 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    COSMOS Organic
                  </p>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Independently certified for every formula in the core range.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Story timeline */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Our story"
            title="From kitchen counter to certified-organic studio."
            description="Eight years of stubbornly slow growth — one farm partnership, one rigorously tested formula at a time."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                className="shadow-soft relative overflow-hidden rounded-3xl border bg-card p-6"
              >
                <span
                  aria-hidden
                  className="absolute right-3 top-2 font-heading text-6xl font-semibold italic leading-none text-foreground/[0.05]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {t.year}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Pillars */}
      <section className="bg-cream-gradient py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="What we believe"
            title="Three rules we won't bend, for any margin."
            description="They guide every supplier we approve, every formula we ship, and every shortcut we refuse to take."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="shadow-soft relative overflow-hidden rounded-3xl border bg-background/80 p-7 backdrop-blur"
              >
                <span
                  aria-hidden
                  className="absolute right-4 top-3 font-heading text-7xl font-semibold italic leading-none text-foreground/[0.05]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Farm to face journey */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Farm to face"
            title="Five quiet, deliberate steps."
            description="No drum-mixed bulk batches, no white-label outsourcing. Here's exactly what happens between the soil and your shelf."
          />
          <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
            />
            {journey.map((j, i) => {
              const Icon = j.icon;
              return (
                <li key={j.title} className="relative">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="grid size-14 place-items-center rounded-full border-2 border-primary/20 bg-background text-primary">
                      <Icon className="size-6" />
                    </span>
                    <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-1 font-heading text-base font-semibold">{j.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{j.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Organic ingredients spotlight */}
      <section className="bg-olive-gradient py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Inside the bottle"
            title="Six hero botanicals — and where they come from."
            description="We name our suppliers because we trust them. Every batch is traceable back to the cooperative or farm that grew it."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing) => (
              <li
                key={ing.name}
                className="shadow-soft rounded-3xl border bg-background/80 p-6 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold">{ing.name}</h3>
                  <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {ing.origin}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ing.body}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <ShieldCheck className="size-3" />
                  {ing.cert}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#ingredients"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              See every active we use <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Clean promise + certifications */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                The Clean Promise
              </p>
              <h2 className="mt-2 text-balance font-heading text-2xl font-semibold tracking-tight xs:text-3xl sm:text-4xl">
                1,824 ingredients we will never put in a bottle.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Our restricted list is stricter than the EU&apos;s — which is itself ten times
                stricter than the FDA&apos;s. A formula only earns the {siteConfig.name} name when
                every line below is satisfied.
              </p>

              <div className="mt-8 grid gap-6">
                {Object.entries(cleanPromise).map(([group, items]) => (
                  <div key={group}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
                      {group}
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 rounded-2xl border bg-card p-3 text-sm"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Third-party verified
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
                Trusted, not just trusted-feeling.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Six independent bodies audit our supply chain, formulas and labour practices —
                annually, with no advance notice.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {certifications.map((c) => (
                  <li
                    key={c.label}
                    className="shadow-soft rounded-2xl border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="size-4 text-primary" />
                      <p className="font-heading text-sm font-semibold">{c.label}</p>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {c.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact */}
      <section className="bg-cream-gradient py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Impact, measured"
            title="Numbers we report every year — even the unflattering ones."
            description="Read the full 2026 Impact Report for our methodology, third-party audits, and what we're still failing at."
            align="center"
          />
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((m) => (
              <div
                key={m.label}
                className="shadow-soft rounded-3xl border bg-background/80 p-6 text-center backdrop-blur"
              >
                <dt className="font-heading text-4xl font-semibold tabular-nums text-primary sm:text-5xl">
                  {m.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <ImpactPill
              icon={TreePine}
              title="1% for the Planet"
              body="One percent of every sale funds reforestation and watershed restoration."
            />
            <ImpactPill
              icon={Recycle}
              title="Refill, don't re-buy"
              body="Glass-first packaging with refill pouches that ship flat and use 82% less material."
            />
            <ImpactPill
              icon={Truck}
              title="Carbon-neutral shipping"
              body="Every order — including international — is offset through verified, audited projects."
            />
          </div>
        </Container>
      </section>

      {/* Founder note */}
      <section className="py-16 sm:py-20">
        <Container size="md">
          <div className="shadow-luxury overflow-hidden rounded-[2rem] border bg-card">
            <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80"
                  alt="Founder Aanya Rao in the Leaf & Lume studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-7 md:p-10">
                <Badge variant="soft" className="rounded-full">
                  <Heart className="mr-1 size-3" /> A note from our founder
                </Badge>
                <blockquote className="mt-5 font-heading text-lg leading-snug text-foreground sm:text-xl md:text-2xl">
                  &ldquo;I started {siteConfig.name} because I wanted skincare I could trust at the{' '}
                  <em className="italic text-primary">ingredient list</em>, not just the marketing.
                  Eight years later, that&apos;s still the only KPI that matters to me.&rdquo;
                </blockquote>
                <p className="mt-5 font-heading text-base italic">Aanya Rao</p>
                <p className="text-xs text-muted-foreground">Founder &amp; head of formulation</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border bg-foreground p-6 text-center text-background sm:p-10 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-primary/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-10 size-60 rounded-full bg-emerald-400/20 blur-3xl"
            />
            <div className="relative">
              <Sparkles className="mx-auto size-6 text-primary" />
              <h2 className="mt-4 text-balance font-heading text-2xl font-semibold tracking-tight xs:text-3xl sm:text-4xl">
                Try a botanical that&apos;s actually botanical.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-background/70 sm:text-base">
                Shop the certified-organic collection — or take the 60-second Glow Quiz and earn
                rewards on your first order.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/shop">
                    Shop the collection <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-background/30 bg-background/5 px-6 text-background hover:bg-background/15 hover:text-background"
                >
                  <Link href="/quiz">
                    <Beaker className="size-4" /> Take the Glow Quiz
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}

function ImpactPill({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Recycle;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border bg-background/70 p-5 backdrop-blur">
      <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <p className="mt-3 font-heading text-base font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
