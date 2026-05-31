'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleWishlist } from '@/store/slices/wishlist-slice';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  className?: string;
}

export function WishlistButton({ productId, productName, className }: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const wished = useAppSelector((s) => s.wishlist.ids.includes(productId));

  return (
    <motion.button
      type="button"
      aria-pressed={wished}
      aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(productId));
        toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist', {
          description: productName,
        });
      }}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'shadow-soft grid size-9 place-items-center rounded-full bg-background/90 text-foreground/70 backdrop-blur transition-colors hover:text-primary',
        wished && 'text-rose-500 hover:text-rose-500',
        className,
      )}
    >
      <motion.span
        key={String(wished)}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      >
        <Heart className={cn('size-4', wished && 'fill-rose-500')} aria-hidden />
      </motion.span>
    </motion.button>
  );
}
