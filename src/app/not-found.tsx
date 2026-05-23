import Link from 'next/link';
import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '404 — Page not found',
  description: 'The page you are looking for does not exist.',
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="bg-cream-gradient">
      <Container size="md" className="grid min-h-[70vh] place-items-center py-16 text-center">
        <div>
          <div className="shadow-soft inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80">
            <Sparkles className="size-3 text-primary" />
            Lost in the leaves
          </div>
          <p className="mt-8 font-heading text-[6rem] font-semibold leading-none tracking-tighter text-primary sm:text-[9rem]">
            404
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            It might have moved, or maybe just disappeared into thin air. Let&apos;s get you back to
            something glowy.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shop">Shop bestsellers</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
