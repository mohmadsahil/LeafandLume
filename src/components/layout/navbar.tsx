'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Container } from './container';
import { Logo } from '@/components/common/logo';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { mainNav, megaMenu } from '@/constants/nav';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCartOpen } from '@/store/slices/cart-slice';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useAppSelector((s) => s.wishlist.ids.length);

  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        solid
          ? 'shadow-soft border-b border-border/60 bg-background/85 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container
        as="nav"
        aria-label="Primary"
        className="flex h-16 items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2">
          <MobileMenu />
          <Logo priority />
        </div>

        <ul className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            const isShop = item.title === 'Shop';
            return (
              <li
                key={item.href}
                onMouseEnter={() => isShop && setOpenMega(true)}
                onMouseLeave={() => isShop && setOpenMega(false)}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    active ? 'text-foreground' : 'text-foreground/75',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Search">
            <Link href="/shop">
              <Search className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="relative hidden sm:inline-flex"
          >
            <Link href="/wishlist">
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-1 -top-1 size-4 justify-center rounded-full px-0 text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Cart, ${cartCount} items`}
            className="relative"
            onClick={() => dispatch(setCartOpen(true))}
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 size-4 justify-center rounded-full px-0 text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="hidden sm:inline-flex"
          >
            <Link href="/profile">
              <User className="size-5" />
            </Link>
          </Button>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {openMega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full hidden lg:block"
            onMouseEnter={() => setOpenMega(true)}
            onMouseLeave={() => setOpenMega(false)}
          >
            <div className="shadow-luxury border-y border-border/60 bg-background/95 backdrop-blur-xl">
              <Container className="grid grid-cols-3 gap-8 py-8">
                {megaMenu.map((col) => (
                  <div key={col.title}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {col.title}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {col.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-foreground/80 transition-colors hover:text-primary"
                            onClick={() => setOpenMega(false)}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[88%] flex-col gap-0 p-0 sm:max-w-sm">
        <div className="flex items-center justify-between p-6">
          <Logo />
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
            <X className="size-5" />
          </Button>
        </div>
        <SheetTitle className="sr-only">Site menu</SheetTitle>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 font-heading text-lg font-medium hover:bg-accent"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-6">
            {megaMenu.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {col.title}
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-1.5 text-sm text-foreground/80 hover:bg-accent"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2">
            <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="flex-1" onClick={() => setOpen(false)}>
              <Link href="/signup">Join us</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
