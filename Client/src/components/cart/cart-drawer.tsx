'use client';

import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { EmptyState } from '@/components/common/empty-state';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCartOpen } from '@/store/slices/cart-slice';
import { CartItem } from './cart-item';

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.cart.open);
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={(v) => dispatch(setCartOpen(v))}>
      <SheetContent className="flex w-full max-w-[95vw] flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your bag · {items.length}</SheetTitle>
          <SheetDescription>Complimentary shipping on orders over $50.</SheetDescription>
        </SheetHeader>

        <Separator />

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <EmptyState
              icon={ShoppingBag}
              title="Your bag is empty"
              description="Add a glow staple — your skin will thank you."
              ctaHref="/shop"
              ctaLabel="Shop bestsellers"
            />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <ul className="divide-y px-4 sm:px-6">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} compact />
                  ))}
                </AnimatePresence>
              </ul>
            </ScrollArea>

            <div className="border-t bg-secondary/40 p-4 sm:p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Taxes & shipping calculated at checkout.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" onClick={() => dispatch(setCartOpen(false))}>
                  <Link href="/cart">View bag</Link>
                </Button>
                <Button asChild onClick={() => dispatch(setCartOpen(false))}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
