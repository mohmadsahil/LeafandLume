import type { Metadata } from 'next';
import { siteConfig } from '@/constants/site';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Build a per-page Metadata object that inherits global SEO defaults.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
  keywords = siteConfig.keywords,
  noIndex = false,
}: SeoProps = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
