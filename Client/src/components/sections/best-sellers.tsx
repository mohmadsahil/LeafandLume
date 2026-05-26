import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { ProductGrid } from '@/components/product/product-grid';
import { bestsellers } from '@/data/products';

export function BestSellers() {
  return (
    <section aria-labelledby="bestsellers" className="bg-luxury-gradient relative py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Best Sellers"
          title="The forever favourites"
          description="Customer-voted formulas that earn their place on every shelf."
          ctaHref="/shop?filter=bestseller"
          align="center"
        />
        <div className="mt-10">
          <ProductGrid products={bestsellers()} />
        </div>
      </Container>
    </section>
  );
}
