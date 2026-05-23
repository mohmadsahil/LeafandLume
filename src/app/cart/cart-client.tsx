'use client';

import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/components/cart/cart-item';
import { EmptyState } from '@/components/common/empty-state';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyCoupon, clearCoupon } from '@/store/slices/cart-slice';
import { coupons } from '@/data/coupons';

export function CartClient() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const applied = useAppSelector((s) => s.cart.appliedCoupon);
  const [code, setCode] = useState('');

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5;

  const coupon = coupons.find((c) => c.code === applied && !c.expired);
  let discount = 0;
  if (coupon && (!coupon.minOrder || subtotal >= coupon.minOrder)) {
    discount =
      coupon.discountType === 'percent'
        ? (subtotal * coupon.discountValue) / 100
        : coupon.discountValue;
  }
  const total = Math.max(0, subtotal + shipping - discount);

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    const found = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) return toast.error('Coupon not found');
    if (found.expired) return toast.error('This coupon has expired');
    if (found.minOrder && subtotal < found.minOrder)
      return toast.error(`Add $${(found.minOrder - subtotal).toFixed(2)} more to apply`);
    dispatch(applyCoupon(found.code));
    setCode('');
    toast.success('Coupon applied', { description: `${found.title}` });
  };

  if (items.length === 0) {
    return (
      <div className="mt-16 flex justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Your bag is empty"
          description="A little ritual starts with a single step. Let us help you build it."
          ctaHref="/shop"
          ctaLabel="Shop bestsellers"
        />
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <ul className="divide-y rounded-3xl border bg-card px-6">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </ul>

      <aside className="space-y-4">
        <div className="shadow-soft rounded-3xl border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />
            {discount > 0 && (
              <Row
                label={`Discount (${applied})`}
                value={`−$${discount.toFixed(2)}`}
                className="text-primary"
              />
            )}
            <Separator className="my-2" />
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />
          </dl>

          <form onSubmit={onApply} className="mt-5 flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="pl-9 uppercase tracking-wider"
                aria-label="Coupon code"
              />
            </div>
            <Button type="submit" variant="outline">
              Apply
            </Button>
          </form>
          {applied && (
            <p className="mt-2 text-xs text-muted-foreground">
              Applied: <span className="font-semibold">{applied}</span>{' '}
              <button
                className="underline"
                onClick={() => {
                  dispatch(clearCoupon());
                  toast.message('Coupon removed');
                }}
              >
                remove
              </button>
            </p>
          )}

          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/checkout">Continue to checkout</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Taxes calculated at checkout · Secure payments
          </p>
        </div>

        <div className="rounded-3xl border bg-primary/5 p-5 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="size-4 text-primary" aria-hidden />
            Stack coupons & save more
          </div>
          <p className="mt-1 text-muted-foreground">
            Try <code className="font-mono">BUNDLE15</code> when you have two products in your bag.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  className,
}: {
  label: string;
  value: string;
  bold?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className ?? ''}`}>
      <dt className={bold ? 'font-semibold' : 'text-muted-foreground'}>{label}</dt>
      <dd className={`tabular-nums ${bold ? 'font-heading text-lg font-semibold' : ''}`}>
        {value}
      </dd>
    </div>
  );
}
