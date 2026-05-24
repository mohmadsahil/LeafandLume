import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { AddressList } from '@/components/checkout/address-list';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'My addresses',
  description: 'Manage your saved shipping addresses.',
  path: '/profile/addresses',
  noIndex: true,
});

export default function AddressesPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="md">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Back to profile
        </Link>

        <header className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Account
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            My addresses
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Save addresses once and pick the right one at checkout.
          </p>
        </header>

        <div className="mt-8">
          <AddressList
            title={
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="font-heading text-xl font-semibold">Saved addresses</h2>
              </div>
            }
            emptyDescription="Add your first address to speed up checkout."
          />
        </div>
      </Container>
    </section>
  );
}
