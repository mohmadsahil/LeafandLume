'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { bottomNav } from '@/constants/nav';
import { useAppSelector } from '@/store/hooks';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useAppSelector((s) => s.wishlist.ids.length);

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5">
        {bottomNav.map(({ title, href, icon: Icon }) => {
          const active = pathname === href;
          const badge = href === '/cart' ? cartCount : href === '/wishlist' ? wishlistCount : 0;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  active ? 'text-primary' : 'text-foreground/65',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-x-6 top-1 h-1 rounded-full bg-primary"
                    aria-hidden
                  />
                )}
                <div className="relative">
                  <Icon className="size-5" aria-hidden />
                  {badge > 0 && (
                    <Badge className="absolute -right-2 -top-2 size-4 justify-center rounded-full px-0 text-[9px]">
                      {badge}
                    </Badge>
                  )}
                </div>
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
