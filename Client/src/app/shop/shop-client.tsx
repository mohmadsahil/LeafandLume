'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Check, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductGrid } from '@/components/product/product-grid';
import { EmptyState } from '@/components/common/empty-state';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const sortOptions = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price · low to high' },
  { key: 'price-desc', label: 'Price · high to low' },
  { key: 'rating', label: 'Top rated' },
] as const;

type SortKey = (typeof sortOptions)[number]['key'];
type CategorySlug = (typeof categories)[number]['slug'];

export function ShopClient() {
  const [activeCat, setActiveCat] = useState<'all' | CategorySlug>('all');
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? products : products.filter((p) => p.category === activeCat);
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return Number(!!b.bestseller) - Number(!!a.bestseller);
      }
    });
    return list;
  }, [activeCat, sort]);

  const activeCategory = activeCat === 'all' ? null : categories.find((c) => c.slug === activeCat);
  const sortLabel = sortOptions.find((s) => s.key === sort)?.label ?? 'Sort';
  const hasActiveFilter = activeCat !== 'all' || sort !== 'featured';

  return (
    <>
      {/* Category pills — horizontal scroll on mobile, centered wrap on sm+ */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
          <li>
            <CategoryPill isActive={activeCat === 'all'} onClick={() => setActiveCat('all')}>
              All
            </CategoryPill>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <CategoryPill isActive={activeCat === c.slug} onClick={() => setActiveCat(c.slug)}>
                {c.title}
              </CategoryPill>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter / sort toolbar — sticky on mobile so it follows scroll */}
      <div className="sticky top-16 z-30 -mx-4 mt-4 flex items-center justify-between gap-3 border-y border-border/60 bg-background/85 px-4 py-2.5 backdrop-blur sm:static sm:mx-0 sm:mt-5 sm:rounded-full sm:border sm:bg-background sm:px-4">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="font-semibold tabular-nums">{filtered.length}</span>
          <span className="text-muted-foreground">
            {filtered.length === 1 ? 'product' : 'products'}
          </span>
          {activeCategory && (
            <Badge variant="soft" className="ml-1 gap-1 rounded-full pr-1 text-[10px]">
              {activeCategory.title}
              <button
                type="button"
                onClick={() => setActiveCat('all')}
                aria-label={`Clear ${activeCategory.title} filter`}
                className="grid size-4 place-items-center rounded-full transition-colors hover:bg-primary/20"
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {hasActiveFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setActiveCat('all');
                setSort('featured');
              }}
              className="hidden h-8 rounded-full px-3 text-xs text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              Clear
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-full text-xs">
                <ArrowUpDown className="size-3.5" aria-hidden />
                <span className="hidden sm:inline">Sort:&nbsp;</span>
                <span className="max-w-[110px] truncate sm:max-w-none">{sortLabel}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className="justify-between gap-2"
                >
                  <span>{opt.label}</span>
                  {sort === opt.key && (
                    <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Product grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCat}-${sort}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-6"
        >
          {filtered.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={Filter}
                title="No matches"
                description="Try a different category or clear your filters."
                ctaLabel="Show everything"
                ctaHref="/shop"
              />
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="mt-12 flex flex-col items-center gap-2">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/quiz">Not sure where to start? Play the Glow Quiz →</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          60-second quiz · Earn Glow Points · Free
        </p>
      </div>
    </>
  );
}

function CategoryPill({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all',
        isActive
          ? 'shadow-soft border-foreground bg-foreground text-background'
          : 'border-border bg-background backdrop-blur hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary',
      )}
    >
      {children}
    </button>
  );
}
