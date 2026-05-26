import Link from 'next/link';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Lock,
  Plus,
  Sparkles,
  Truck,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Container } from './container';
import { Logo } from '@/components/common/logo';
import { FooterNewsletter } from './footer-newsletter';
import { footerNav } from '@/constants/nav';
import { siteConfig } from '@/constants/site';

const socials = [
  { label: 'Instagram', href: siteConfig.links.instagram, icon: Instagram },
  { label: 'Twitter', href: siteConfig.links.twitter, icon: Twitter },
  { label: 'Facebook', href: siteConfig.links.facebook, icon: Facebook },
  { label: 'YouTube', href: siteConfig.links.youtube, icon: Youtube },
];

const promises = [
  { icon: Truck, text: 'Free shipping over $50' },
  { icon: Heart, text: '30-day glow guarantee' },
  { icon: Leaf, text: 'Cruelty-free & vegan' },
  { icon: Sparkles, text: 'Clinically tested' },
];

export function Footer() {
  return (
    <footer className="bg-cream-gradient relative mt-12 overflow-hidden border-t">
      {/* Decorative leaves */}
      <Leaf
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-24 rotate-12 text-primary/[0.07] sm:size-32 md:size-40"
      />
      <Leaf
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-10 size-28 -rotate-12 text-primary/[0.05] sm:size-36 md:size-44"
      />

      <Container className="relative">
        {/* Newsletter strip */}
        <div className="flex flex-col items-start justify-between gap-4 border-b py-5 sm:flex-row sm:items-center">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
              <Sparkles className="size-3" aria-hidden />
              Glow letter
            </div>
            <h2 className="mt-2 font-heading text-lg font-semibold leading-tight sm:text-xl">
              Get 10% off — plus monthly skincare wisdom.
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              No spam. Unsubscribe in a tap.
            </p>
          </div>
          <FooterNewsletter />
        </div>

        {/* Brand + nav */}
        <div className="grid gap-6 py-6 lg:grid-cols-6 lg:items-start lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="mt-4 flex items-center gap-1.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="grid size-8 place-items-center rounded-full border border-border/60 bg-background/70 text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: 4-col nav grid */}
          <div className="hidden lg:col-span-4 lg:grid lg:grid-cols-4 lg:gap-6">
            {footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
                  {column.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xs text-foreground/80 transition-colors hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Mobile: each nav column = its own accordion card */}
          <AccordionPrimitive.Root
            type="multiple"
            aria-label="Footer navigation"
            className="space-y-2.5 lg:hidden"
          >
            {footerNav.map((column) => (
              <AccordionPrimitive.Item
                key={column.title}
                value={column.title}
                className="shadow-soft overflow-hidden rounded-2xl border border-border/70 bg-background/70 px-4 backdrop-blur"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    suppressHydrationWarning
                    className="group flex flex-1 items-center justify-between gap-2 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-primary"
                  >
                    {column.title}
                    <span
                      aria-hidden
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground"
                    >
                      <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-2 pb-4">
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-lg py-1 text-xs text-foreground/80 transition-colors hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>

        {/* Promises + legal */}
        <div className="flex flex-col gap-3 border-t py-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-1.5">
                <Icon className="size-3 text-primary" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Lock className="size-3 text-primary" aria-hidden /> Secure checkout
            </span>
            <span aria-hidden className="opacity-50">
              ·
            </span>
            <span>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
