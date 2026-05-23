import type { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' }[] =
    [
      { path: '/', priority: 1, changeFrequency: 'weekly' },
      { path: '/shop', priority: 0.9, changeFrequency: 'weekly' },
      { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/coupons', priority: 0.6, changeFrequency: 'weekly' },
      { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
      { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
    ];

  const productRoutes = products.map((p) => ({
    path: `/product/${p.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  return [...staticRoutes, ...productRoutes].map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
