import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Gift,
  Heart,
  MapPin,
  Settings,
  ShoppingBag,
  Sparkles,
  Tag,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'My profile',
  description: 'Manage your account, addresses and preferences.',
  path: '/profile',
  noIndex: true,
});

const menuItems = [
  { title: 'My orders', href: '/orders', icon: ShoppingBag, hint: '3 active' },
  { title: 'Wishlist', href: '/wishlist', icon: Heart },
  { title: 'Coupons & rewards', href: '/coupons', icon: Tag, hint: '4 available' },
  { title: 'Addresses', href: '#', icon: MapPin },
  { title: 'Refer & earn', href: '#', icon: Gift, hint: '$10 per friend' },
  { title: 'Settings', href: '#', icon: Settings },
];

export default function ProfilePage() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="md">
        <Card className="shadow-luxury overflow-hidden rounded-3xl border-0 bg-foreground text-background">
          <CardContent className="relative p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-primary/40 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <div className="relative size-16 overflow-hidden rounded-full bg-background/10 ring-2 ring-background/30">
                <Image
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=you&backgroundColor=fef3c7"
                  alt=""
                  fill
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-sm text-background/70">Welcome back</p>
                <h1 className="font-heading text-2xl font-semibold">Aanya R.</h1>
                <Badge
                  variant="soft"
                  className="mt-2 bg-background/15 text-background hover:bg-background/20"
                >
                  <Sparkles className="mr-1 size-3" /> Glow Insider · Silver
                </Badge>
              </div>
            </div>
            <Separator className="my-5 bg-background/20" />
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <Stat label="Orders" value="12" />
              <Stat label="Points" value="640" />
              <Stat label="Saved" value="$54" />
            </div>
          </CardContent>
        </Card>

        <ul className="mt-6 divide-y rounded-3xl border bg-card">
          {menuItems.map(({ title, href, icon: Icon, hint }) => (
            <li key={title}>
              <Link
                href={href}
                className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-accent/50"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="flex-1 font-medium">{title}</span>
                {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <Button variant="outline" className="mt-6 w-full">
          Sign out
        </Button>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background/10 p-3">
      <div className="font-heading text-xl font-semibold">{value}</div>
      <div className="text-background/70">{label}</div>
    </div>
  );
}
