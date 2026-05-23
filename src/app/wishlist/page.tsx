import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { WishlistClient } from './wishlist-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Wishlist',
  description: 'Your saved skincare picks.',
  path: '/wishlist',
  noIndex: true,
});

export default function WishlistPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Saved</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Your wishlist
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Heart anything you love — we will keep it here for later.
          </p>
        </header>
        <WishlistClient />
      </Container>
    </section>
  );
}
