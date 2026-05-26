'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Coupon } from '@/types';
import { cn } from '@/lib/utils';

interface CouponCardProps {
  coupon: Coupon;
  className?: string;
}

export function CouponCard({ coupon, className }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const disabled = coupon.expired;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast.success('Coupon copied', { description: coupon.code });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <motion.div
      whileHover={{ y: disabled ? 0 : -2 }}
      className={cn(
        'shadow-soft relative overflow-hidden rounded-3xl border bg-background p-5',
        'before:absolute before:-left-3 before:top-1/2 before:size-6 before:-translate-y-1/2 before:rounded-full before:bg-background',
        'after:absolute after:-right-3 after:top-1/2 after:size-6 after:-translate-y-1/2 after:rounded-full after:bg-background',
        disabled && 'opacity-60',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant={disabled ? 'outline' : 'soft'} className="rounded-full">
            <Sparkles className="mr-1 size-3" aria-hidden />
            {coupon.discountType === 'percent'
              ? `${coupon.discountValue}% off`
              : `$${coupon.discountValue} off`}
          </Badge>
          <h3 className="mt-3 font-heading text-base font-semibold leading-tight sm:text-lg">{coupon.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{coupon.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-dashed pt-4 sm:gap-3">
        <code className="truncate rounded-lg bg-secondary px-2 py-1.5 font-mono text-xs tracking-wider sm:px-3 sm:text-sm">
          {coupon.code}
        </code>
        <Button
          variant={disabled ? 'outline' : 'default'}
          size="sm"
          onClick={copy}
          disabled={disabled}
          className="ml-auto"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {disabled ? 'Expired' : copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">
        {disabled
          ? `Expired ${new Date(coupon.expiresAt).toLocaleDateString()}`
          : `Expires ${new Date(coupon.expiresAt).toLocaleDateString()}`}
        {coupon.minOrder ? ` · Min. order $${coupon.minOrder}` : ''}
      </p>
    </motion.div>
  );
}
