import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Rules of the road for using leafandlume.com.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <article className="py-12 sm:py-20">
      <Container size="md">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: 1 January 2026</p>
        </header>

        <div className="prose prose-sm prose-neutral dark:prose-invert mt-8 max-w-none text-foreground/85 sm:prose sm:mt-10">
          <p>
            Welcome to Leaf &amp; Lume. By accessing or using our website you agree to be bound by
            these Terms.
          </p>
          <h2>Use of the site</h2>
          <p>
            You may use our site only for lawful purposes. You agree not to misuse our content,
            interfere with our services, or attempt to access them in any other way than through the
            interface we provide.
          </p>
          <h2>Orders &amp; payment</h2>
          <p>
            All orders are subject to acceptance and availability. Prices are listed in USD and
            include applicable taxes unless stated otherwise.
          </p>
          <h2>Returns</h2>
          <p>
            We offer a 30-day glow guarantee. If a product doesn&apos;t suit your skin we will
            refund you, no questions asked.
          </p>
          <h2>Intellectual property</h2>
          <p>
            All content on this site, including text, graphics, logos and product photography, is
            the property of Leaf &amp; Lume and protected by copyright.
          </p>
          <h2>Liability</h2>
          <p>
            To the maximum extent permitted by law, Leaf &amp; Lume shall not be liable for any
            indirect, incidental or consequential damages arising from use of the site or products.
          </p>
          <h2>Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the site after changes
            constitutes acceptance of the revised Terms.
          </p>
        </div>
      </Container>
    </article>
  );
}
