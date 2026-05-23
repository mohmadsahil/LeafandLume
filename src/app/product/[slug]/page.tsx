import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Leaf, Sparkles, Truck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RatingStars } from '@/components/common/rating-stars';
import { SectionHeader } from '@/components/common/section-header';
import { ProductGrid } from '@/components/product/product-grid';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { WishlistButton } from '@/components/product/wishlist-button';
import { findProductBySlug, products } from '@/data/products';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/product/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <article className="pb-12 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-secondary">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-1.5">
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
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((src, i) => (
                  <div
                    key={src + i}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-secondary"
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {product.category}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-4 flex items-center gap-2">
              <RatingStars value={product.rating} />
              <span className="text-sm text-muted-foreground">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="rounded-full">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                </>
              )}
              <span className="ml-auto text-sm text-muted-foreground">{product.size}</span>
            </div>

            <div className="mt-6 flex items-stretch gap-2">
              <AddToCartButton product={product} variant="full" />
              <WishlistButton
                productId={product.id}
                productName={product.name}
                className="size-12 shrink-0"
              />
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px]">
              {[
                { icon: Leaf, label: 'Clean formula' },
                { icon: Sparkles, label: 'Dermatologist tested' },
                { icon: Truck, label: 'Free shipping over $50' },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-2xl border bg-card p-3"
                >
                  <Icon className="size-4 text-primary" aria-hidden />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>

            <Separator className="my-8" />

            <Accordion type="single" collapsible defaultValue="benefits" className="w-full">
              <AccordionItem value="benefits">
                <AccordionTrigger>Benefits</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger>Key ingredients</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((i) => (
                      <Badge key={i} variant="soft" className="rounded-full">
                        {i}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage">
                <AccordionTrigger>How to use</AccordionTrigger>
                <AccordionContent>{product.usage}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="details">
                <AccordionTrigger>Full description</AccordionTrigger>
                <AccordionContent>{product.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-20">
            <SectionHeader eyebrow="You may also love" title="From the same routine" />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
