import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/common/section-header';
import { instagramPosts } from '@/data/hero-slides';
import { siteConfig } from '@/constants/site';

export function InstagramGallery() {
  return (
    <section id="instagram" aria-labelledby="instagram" className="py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="@leafandlume"
          title="Tagged by our community"
          description="Show us your glow and you might land on the grid."
          ctaHref={siteConfig.links.instagram}
          ctaLabel="Follow on Instagram"
        />
      </Container>

      <ul className="mt-8 grid grid-cols-4 gap-1 sm:grid-cols-8">
        {instagramPosts.map((src, i) => (
          <li key={src} className="group relative aspect-square overflow-hidden">
            <Link href={siteConfig.links.instagram} aria-label="Open Instagram">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 25vw, 12vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 grid place-items-center bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="size-5 text-white" aria-hidden />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
