import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { CartClient } from './cart-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Your bag',
  description: 'Review your bag and check out securely.',
  path: '/cart',
  noIndex: true,
});

export default function CartPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="lg">
        <header>
          <h1 className="font-heading text-2xl font-semibold tracking-tight xs:text-3xl sm:text-4xl">
            Your bag
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Free shipping over $50. 30-day glow guarantee.
          </p>
        </header>
        <CartClient />
      </Container>
    </section>
  );
}
