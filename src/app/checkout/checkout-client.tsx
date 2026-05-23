'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  CreditCard,
  MapPin,
  ShoppingBag,
  Sparkles,
  Truck,
  Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cart-slice';
import { cn } from '@/lib/utils';

type Step = 'address' | 'payment' | 'review' | 'success';
const order: Step[] = ['address', 'payment', 'review'];

export function CheckoutClient() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const applied = useAppSelector((s) => s.cart.appliedCoupon);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  const [step, setStep] = useState<Step>('address');
  const [addressId, setAddressId] = useState('home');
  const [payment, setPayment] = useState('card');

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="mt-12 rounded-3xl border bg-card p-10 text-center">
        <ShoppingBag className="mx-auto size-8 text-primary" aria-hidden />
        <p className="mt-3 font-medium">Your bag is empty</p>
        <p className="text-sm text-muted-foreground">Add a product before checking out.</p>
        <Button asChild className="mt-5">
          <Link href="/shop">Shop now</Link>
        </Button>
      </div>
    );
  }

  const handleNext = () => {
    const idx = order.indexOf(step as Exclude<Step, 'success'>);
    if (idx < order.length - 1) {
      setStep(order[idx + 1]!);
    } else {
      setStep('success');
      dispatch(clearCart());
      toast.success('Order placed', { description: 'A confirmation has been sent to your inbox.' });
    }
  };
  const handleBack = () => {
    const idx = order.indexOf(step as Exclude<Step, 'success'>);
    if (idx > 0) setStep(order[idx - 1]!);
  };

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div>
        {step !== 'success' && <Stepper step={step} />}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 'address' && <AddressStep value={addressId} onChange={setAddressId} />}
              {step === 'payment' && <PaymentStep value={payment} onChange={setPayment} />}
              {step === 'review' && <ReviewStep />}
              {step === 'success' && <SuccessStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        {step !== 'success' && (
          <div className="mt-8 flex items-center gap-3">
            {step !== 'address' && (
              <Button variant="ghost" onClick={handleBack}>
                <ChevronLeft className="size-4" /> Back
              </Button>
            )}
            <Button onClick={handleNext} size="lg" className="ml-auto">
              {step === 'review' ? `Place order · $${total.toFixed(2)}` : 'Continue'}
            </Button>
          </div>
        )}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="shadow-soft rounded-3xl border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium leading-snug">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <dl className="space-y-1.5 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />
            {applied && (
              <Row label={`Coupon ${applied}`} value="applied" className="text-primary" />
            )}
            <Separator className="my-2" />
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />
          </dl>
        </div>

        <div className="rounded-3xl border bg-primary/5 p-5 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="size-4 text-primary" />
            Free travel duo over $80
          </div>
          <p className="mt-1 text-muted-foreground">Auto-added at checkout.</p>
        </div>
      </aside>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const labels: { key: Step; label: string }[] = [
    { key: 'address', label: 'Address' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];
  const idx = labels.findIndex((l) => l.key === step);
  return (
    <ol className="flex items-center gap-2">
      {labels.map((l, i) => {
        const active = i === idx;
        const done = i < idx;
        return (
          <li key={l.key} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                'grid size-8 place-items-center rounded-full text-xs font-semibold',
                active
                  ? 'bg-primary text-primary-foreground'
                  : done
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              {done ? <Check className="size-4" /> : i + 1}
            </div>
            <span
              className={cn(
                'text-sm font-medium',
                active ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {l.label}
            </span>
            {i < labels.length - 1 && <div className="ml-2 h-px flex-1 bg-border" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}

function AddressStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const addresses = [
    {
      id: 'home',
      label: 'Home',
      name: 'Aanya R.',
      line: '14 Botanical Lane, Studio 3, Brooklyn NY 11206',
      phone: '+1 (555) 010-2233',
    },
    {
      id: 'work',
      label: 'Office',
      name: 'Aanya R.',
      line: '420 Park Ave, 12th Floor, Manhattan NY 10022',
      phone: '+1 (555) 010-2233',
    },
  ];
  return (
    <section>
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-primary" />
        <h2 className="font-heading text-xl font-semibold">Shipping address</h2>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {addresses.map((a) => {
          const selected = a.id === value;
          return (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => onChange(a.id)}
                className={cn(
                  'flex w-full flex-col gap-1 rounded-3xl border bg-card p-5 text-left transition-all',
                  selected ? 'border-primary ring-2 ring-primary/30' : 'hover:shadow-soft',
                )}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="soft" className="rounded-full">
                    {a.label}
                  </Badge>
                  {selected && (
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  )}
                </div>
                <p className="mt-2 font-medium">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.line}</p>
                <p className="text-sm text-muted-foreground">{a.phone}</p>
              </button>
            </li>
          );
        })}
      </ul>
      <Button variant="outline" className="mt-3">
        + Add a new address
      </Button>
    </section>
  );
}

function PaymentStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const methods = [
    { id: 'card', label: 'Credit / debit card', icon: CreditCard },
    { id: 'wallet', label: 'Apple Pay / Google Pay', icon: Wallet },
    { id: 'cod', label: 'Cash on delivery', icon: Truck },
  ];
  return (
    <section>
      <div className="flex items-center gap-2">
        <CreditCard className="size-5 text-primary" />
        <h2 className="font-heading text-xl font-semibold">Payment method</h2>
      </div>
      <ul className="mt-5 space-y-2">
        {methods.map(({ id, label, icon: Icon }) => {
          const selected = id === value;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange(id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-all',
                  selected ? 'border-primary ring-2 ring-primary/30' : 'hover:shadow-soft',
                )}
              >
                <Icon className="size-5 text-foreground/70" />
                <span className="flex-1 font-medium">{label}</span>
                {selected && (
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {value === 'card' && (
        <div className="mt-5 grid gap-4 rounded-3xl border bg-card p-5">
          <div className="grid gap-2">
            <Label htmlFor="cn">Card number</Label>
            <Input id="cn" placeholder="1234 5678 9012 3456" inputMode="numeric" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="exp">Expiry</Label>
              <Input id="exp" placeholder="MM / YY" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewStep() {
  return (
    <section className="rounded-3xl border bg-card p-6">
      <h2 className="font-heading text-xl font-semibold">Review &amp; place order</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        By placing your order you agree to our{' '}
        <Link href="/terms" className="underline">
          Terms
        </Link>{' '}
        and acknowledge our{' '}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
        <li>· Estimated delivery: 3–5 business days</li>
        <li>· Free 30-day glow guarantee on every order</li>
        <li>· Secure encrypted checkout</li>
      </ul>
    </section>
  );
}

function SuccessStep() {
  return (
    <section className="rounded-3xl border bg-card p-10 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
        <Check className="size-7" aria-hidden />
      </div>
      <h2 className="mt-5 font-heading text-2xl font-semibold">Order confirmed</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Thanks for shopping with us. We have sent the details to your inbox.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Button asChild variant="outline">
          <Link href="/orders">View orders</Link>
        </Button>
        <Button asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </section>
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
