import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently asked questions',
  description: 'Shipping, returns, ingredients and everything else you might want to know.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <section className="py-10 sm:py-16">
      <Container size="md">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
            Good questions, great answers
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contact" className="font-medium text-foreground underline">
              Get in touch
            </Link>
            .
          </p>
        </header>

        <Accordion type="single" collapsible className="mt-10 rounded-3xl border bg-card px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="last:border-b-0">
              <AccordionTrigger className="font-heading text-base">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
