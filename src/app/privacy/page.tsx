import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How we collect, use and protect your data at Leaf & Lume.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <article className="py-12 sm:py-20">
      <Container size="md">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: 1 January 2026</p>
        </header>

        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none text-foreground/85">
          <p>
            This Privacy Policy describes how Leaf &amp; Lume (&quot;we&quot;, &quot;us&quot;)
            collects, uses, and shares information when you visit or make a purchase from our site.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you visit our site we automatically collect device information such as browser
            type, operating system, and pages viewed. When you make a purchase we collect your name,
            billing and shipping address, email, phone and payment details.
          </p>
          <h2>How we use it</h2>
          <p>
            We use the information to fulfil orders, communicate with you, screen for risk and
            fraud, and improve our products and site. We do not sell your data.
          </p>
          <h2>Your rights</h2>
          <p>
            You may request access, correction or deletion of your personal data at any time by
            emailing privacy@leafandlume.example.com.
          </p>
          <h2>Cookies</h2>
          <p>
            We use a small number of cookies to remember your bag, your preferences, and to measure
            traffic. You can disable cookies in your browser settings.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Reach us anytime at{' '}
            <a href="mailto:privacy@leafandlume.example.com">privacy@leafandlume.example.com</a>.
          </p>
        </div>
      </Container>
    </article>
  );
}
