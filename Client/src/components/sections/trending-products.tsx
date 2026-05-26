'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { ProductCard } from '@/components/product/product-card';
import { products } from '@/data/products';

export function TrendingProducts() {
  const list = products.slice(0, 6);
  return (
    <section aria-labelledby="trending" className="py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="Trending now"
          title="Loved by glow-getters this week"
          description="The pieces flying off shelves — restocked for you."
          ctaHref="/shop"
        />

        <Carousel opts={{ align: 'start', containScroll: 'trimSnaps' }} className="mt-8">
          <CarouselContent className="-ml-3">
            {list.map((p, i) => (
              <CarouselItem
                key={p.id}
                className="basis-[70%] pl-3 xs:basis-[58%] sm:basis-[38%] md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard product={p} priority={i < 2} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </Container>
    </section>
  );
}
