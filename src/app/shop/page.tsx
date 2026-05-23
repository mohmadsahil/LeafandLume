import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { ShopClient } from './shop-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Shop all',
  description:
    'Shop all Leaf & Lume products — cleansers, serums, moisturizers, sunscreens and more.',
  path: '/shop',
});

export default function ShopPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Shop</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
            The whole collection
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Mix, match and layer to build the routine your skin actually craves.
          </p>
        </header>
        <ShopClient />
      </Container>
    </section>
  );
}
