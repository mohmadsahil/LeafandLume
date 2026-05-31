'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { RatingStars } from '@/components/common/rating-stars';
import { AddToCartButton } from './add-to-cart-button';
import { WishlistButton } from './wishlist-button';
import type { Product } from '@/types';

export function QuickView({ product, children }: { product: Product; children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] gap-0 p-0 sm:max-w-2xl sm:rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden sm:rounded-l-3xl sm:rounded-tr-none">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex gap-1.5">
              {product.bestseller && (
                <Badge className="rounded-full bg-foreground text-background">Bestseller</Badge>
              )}
              {product.isNew && (
                <Badge variant="soft" className="rounded-full">
                  New
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col p-4 sm:p-6">
            <DialogHeader>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {product.category}
              </p>
              <DialogTitle className="mt-1">{product.name}</DialogTitle>
              <DialogDescription>{product.shortDescription}</DialogDescription>
            </DialogHeader>

            <div className="mt-3 flex items-center gap-2">
              <RatingStars value={product.rating} />
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-heading text-xl font-semibold sm:text-2xl">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="ml-auto text-xs text-muted-foreground">{product.size}</span>
            </div>

            <Separator className="my-4" />

            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {product.benefits.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2">
              <AddToCartButton product={product} variant="full" />
              <WishlistButton productId={product.id} productName={product.name} />
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="mt-3 text-center text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              View full details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
