import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { CheckoutClient } from './checkout-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Checkout',
  description: 'Secure checkout for your Leaf & Lume order.',
  path: '/checkout',
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="lg">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Checkout</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Almost there
          </h1>
        </header>
        <CheckoutClient />
      </Container>
    </section>
  );
}
