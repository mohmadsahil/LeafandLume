'use client';

import { Heart } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { ProductGrid } from '@/components/product/product-grid';
import { SectionHeader } from '@/components/common/section-header';
import { useAppSelector } from '@/store/hooks';
import { bestsellers, products } from '@/data/products';

export function WishlistClient() {
  const ids = useAppSelector((s) => s.wishlist.ids);
  const items = products.filter((p) => ids.includes(p.id));
  const recommended = bestsellers()
    .filter((p) => !ids.includes(p.id))
    .slice(0, 4);

  return (
    <>
      {items.length === 0 ? (
        <div className="mt-16 flex justify-center">
          <EmptyState
            icon={Heart}
            title="Nothing saved yet"
            description="Tap the heart on any product and it will land here."
            ctaHref="/shop"
            ctaLabel="Browse shop"
          />
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={items} />
        </div>
      )}

      {recommended.length > 0 && (
        <section aria-labelledby="recommended" className="mt-16 sm:mt-20">
          <SectionHeader
            eyebrow="Crowd favourites"
            title="You might also love"
            description="Bestsellers picked for you, based on what others can't stop loving."
            ctaHref="/shop"
            ctaLabel="View all"
          />
          <div className="mt-8">
            <ProductGrid products={recommended} />
          </div>
        </section>
      )}
    </>
  );
}
