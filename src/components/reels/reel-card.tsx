'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, setCartOpen } from '@/store/slices/cart-slice';
import type { Reel, Product } from '@/types';
import { cn } from '@/lib/utils';

interface ReelCardProps {
  reel: Reel;
  product?: Product;
  isActive: boolean;
  className?: string;
}

export function ReelCard({ reel, product, isActive, className }: ReelCardProps) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        quantity: 1,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    toast.success('Added to bag', {
      description: product.name,
      action: { label: 'View bag', onClick: () => dispatch(setCartOpen(true)) },
    });
  };

  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.82,
        opacity: isActive ? 1 : 0.7,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative w-full max-w-[280px]', className)}
    >
      <Link
        href={product ? `/product/${product.slug}` : '#'}
        className="shadow-luxury group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl bg-secondary"
        aria-label={`Reel: ${reel.caption}`}
        tabIndex={isActive ? 0 : -1}
      >
        <Image
          src={reel.thumbnail}
          alt=""
          fill
          sizes="(max-width: 640px) 60vw, 280px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/15" />

        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md"
        >
          <Play className="size-6 fill-current" aria-hidden />
        </motion.div>

        <p className="absolute inset-x-4 bottom-4 line-clamp-2 font-heading text-sm italic leading-snug text-white drop-shadow sm:text-base">
          {reel.caption}
        </p>
      </Link>

      {product && (
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 12,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden={!isActive}
          className={cn(
            'shadow-luxury pointer-events-none relative mx-3 -mt-5 rounded-2xl border border-border/60 bg-background p-2.5',
            isActive && 'pointer-events-auto',
          )}
        >
          <div className="flex items-center gap-2.5">
            <Link
              href={`/product/${product.slug}`}
              className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-secondary"
              tabIndex={isActive ? 0 : -1}
              aria-label={product.name}
            >
              <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${product.slug}`}
                className="line-clamp-1 text-xs font-semibold text-foreground transition-colors hover:text-primary sm:text-sm"
                tabIndex={isActive ? 0 : -1}
              >
                {product.name}
              </Link>
              <div className="mt-1 flex items-center gap-1">
                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  {product.size}
                </span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-[11px] text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleAdd}
              disabled={!isActive}
              aria-label={`Add ${product.name} to bag`}
              tabIndex={isActive ? 0 : -1}
              className="shadow-luxury grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {added ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <Plus className="size-4" aria-hidden />
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
