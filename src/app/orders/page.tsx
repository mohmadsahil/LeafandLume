import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'My orders',
  description: 'View and track your Leaf & Lume orders.',
  path: '/orders',
  noIndex: true,
});

const orders = [
  {
    id: 'LL-10248',
    placedOn: '2026-05-12',
    items: ['Glow Vitamin C Serum', 'Shield Mineral SPF 50'],
    total: 58,
    status: 'delivered',
    eta: 'Delivered May 16',
  },
  {
    id: 'LL-10231',
    placedOn: '2026-04-29',
    items: ['Hydra Bloom Moisturizer'],
    total: 28,
    status: 'shipped',
    eta: 'Arriving May 24',
  },
  {
    id: 'LL-10199',
    placedOn: '2026-03-18',
    items: ['Gentle Foam Cleanser', 'Clarity Clay Mask'],
    total: 42,
    status: 'processing',
    eta: 'Ships in 1–2 days',
  },
];

const STATUS = {
  processing: { label: 'Processing', icon: Package, tone: 'bg-amber-100 text-amber-700' },
  shipped: { label: 'Shipped', icon: Truck, tone: 'bg-sky-100 text-sky-700' },
  delivered: { label: 'Delivered', icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-700' },
} as const;

export default function OrdersPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="lg">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Account</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Your orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track shipments and re-order favourites.
          </p>
        </header>

        <ul className="mt-8 space-y-4">
          {orders.map((o) => {
            const meta = STATUS[o.status as keyof typeof STATUS];
            const Icon = meta.icon;
            return (
              <li
                key={o.id}
                className="shadow-soft hover:shadow-luxury rounded-3xl border bg-card p-6 transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">#{o.id}</p>
                    <h2 className="mt-1 font-heading text-lg font-semibold">
                      {o.items.join(' · ')}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Placed {new Date(o.placedOn).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`rounded-full ${meta.tone}`}>
                    <Icon className="mr-1 size-3" aria-hidden />
                    {meta.label}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{o.eta}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold tabular-nums">${o.total}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/shop">Reorder</Link>
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
