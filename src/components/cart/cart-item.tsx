'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/slices/cart-slice';
import type { CartItem as CartItemType } from '@/types';

export function CartItem({ item, compact = false }: { item: CartItemType; compact?: boolean }) {
  const dispatch = useAppDispatch();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="flex gap-4 py-4"
    >
      <Link
        href={`/product/${item.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-secondary sm:size-24"
      >
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${item.slug}`}
            className="font-heading text-sm font-semibold leading-tight hover:text-primary sm:text-base"
          >
            {item.name}
          </Link>
          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={() => dispatch(removeFromCart(item.id))}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">{item.size}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="inline-flex items-center rounded-full border bg-background">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              className="grid size-8 place-items-center rounded-full transition-colors hover:bg-accent"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              className="grid size-8 place-items-center rounded-full transition-colors hover:bg-accent"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <p className="font-semibold tabular-nums">
            ${(item.price * item.quantity).toFixed(2)}
            {!compact && item.quantity > 1 && (
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                (${item.price} ea)
              </span>
            )}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
