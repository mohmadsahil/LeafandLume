import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Heart, MapPin, ShoppingBag, Tag } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/profile/profile-card';
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
  { title: 'Addresses', href: '/profile/addresses', icon: MapPin },
];

export default function ProfilePage() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="md">
        <ProfileCard />

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
