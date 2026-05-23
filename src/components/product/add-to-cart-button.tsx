'use client';

import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, setCartOpen } from '@/store/slices/cart-slice';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: 'icon' | 'full';
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = 'icon',
  className,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        quantity,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    toast.success('Added to bag', {
      description: product.name,
      action: { label: 'View bag', onClick: () => dispatch(setCartOpen(true)) },
    });
  };

  if (variant === 'icon') {
    return (
      <motion.button
        type="button"
        aria-label={`Add ${product.name} to cart`}
        onClick={handleAdd}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className={cn(
          'shadow-luxury grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90',
          className,
        )}
      >
        {added ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
      </motion.button>
    );
  }

  return (
    <Button onClick={handleAdd} size="lg" className={cn('w-full', className)}>
      {added ? (
        <>
          <Check /> Added
        </>
      ) : (
        <>
          <Plus /> Add to bag · ${product.price}
        </>
      )}
    </Button>
  );
}
