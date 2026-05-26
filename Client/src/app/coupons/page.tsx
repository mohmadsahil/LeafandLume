import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { CouponCard } from '@/components/common/coupon-card';
import { coupons } from '@/data/coupons';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Coupons & offers',
  description: 'Available coupons, cashback offers and seasonal promos.',
  path: '/coupons',
});

export default function CouponsPage() {
  const active = coupons.filter((c) => !c.expired);
  const expired = coupons.filter((c) => c.expired);
  return (
    <section className="py-10 sm:py-14">
      <Container size="lg">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Offers</p>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight xs:text-3xl sm:text-4xl">
            Coupons & rewards
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Tap any code to copy it, then paste at checkout. Some stack with others — try a few.
          </p>
        </header>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs text-primary sm:w-fit">
          <Sparkles className="size-3.5" />
          You also save 10% on your first order with code{' '}
          <strong className="ml-1">WELCOME10</strong>.
        </div>

        <h2 className="mt-10 font-heading text-xl font-semibold">Active offers</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((c) => (
            <li key={c.id}>
              <CouponCard coupon={c} />
            </li>
          ))}
        </ul>

        {expired.length > 0 && (
          <>
            <h2 className="mt-12 font-heading text-xl font-semibold text-muted-foreground">
              Expired
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expired.map((c) => (
                <li key={c.id}>
                  <CouponCard coupon={c} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
}
