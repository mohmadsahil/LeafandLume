'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/common/rating-stars';
import { WishlistButton } from './wishlist-button';
import { QuickView } from './quick-view';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, setCartOpen } from '@/store/slices/cart-slice';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cartPayload = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
    size: product.size,
    quantity: 1,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(cartPayload));
    toast.success('Added to bag', {
      description: product.name,
      action: { label: 'View bag', onClick: () => dispatch(setCartOpen(true)) },
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(cartPayload));
    router.push('/checkout');
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('group relative flex h-full flex-col', className)}
    >
      {/* Image container — NO Link wrapper; the Link is an overlay sibling */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Clickable overlay — sits below the action buttons (z-0) */}
        <Link
          href={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-0"
        />

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.bestseller && (
            <Badge className="rounded-full bg-foreground text-background">Bestseller</Badge>
          )}
          {product.isNew && (
            <Badge variant="soft" className="rounded-full">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Interactive overlays — siblings of the Link, above it (z-10) */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <WishlistButton productId={product.id} productName={product.name} />
          <QuickView product={product}>
            <button
              type="button"
              aria-label={`Quick view ${product.name}`}
              className="shadow-soft hidden size-9 place-items-center rounded-full bg-background/90 text-foreground/70 backdrop-blur transition-colors hover:text-primary md:grid"
            >
              <Eye className="size-4" aria-hidden />
            </button>
          </QuickView>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-3 flex flex-1 flex-col gap-1 px-1">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">
          {product.category}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="font-heading text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary sm:text-base"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <RatingStars value={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-semibold tabular-nums">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="mt-3 grid gap-1.5 px-1">
        <Button
          type="button"
          onClick={handleAddToCart}
          className="h-9 w-full rounded-full text-xs font-semibold"
        >
          <ShoppingBag className="size-3.5" aria-hidden />
          Add to Cart
        </Button>
        <Button
          type="button"
          onClick={handleBuyNow}
          variant="outline"
          className="h-9 w-full rounded-full text-xs font-semibold"
        >
          Buy Now
          <ArrowRight className="size-3.5" aria-hidden />
        </Button>
      </div>
    </motion.article>
  );
}
