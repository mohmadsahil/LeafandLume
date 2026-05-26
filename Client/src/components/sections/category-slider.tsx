import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

export function CategorySlider() {
  return (
    <section aria-labelledby="categories" className="py-12 sm:py-16">
      <Container>
        <SectionHeader eyebrow="Shop by category" title="What is your skin in the mood for?" />
      </Container>

      <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop?cat=${c.slug}`}
            className="group relative flex w-40 shrink-0 flex-col gap-3 sm:w-44"
          >
            <div
              className={cn(
                'relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br',
                c.color,
              )}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="px-1">
              <p className="font-heading text-base font-semibold leading-tight">{c.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
