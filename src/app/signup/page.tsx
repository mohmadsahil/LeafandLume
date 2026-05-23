import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { AuthForm } from '@/components/common/auth-form';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Create account',
  description: 'Join Leaf & Lume and get 10% off your first order.',
  path: '/signup',
  noIndex: true,
});

export default function SignupPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="sm">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Join the glow club
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            10% off your first order. Plus, early access to new launches.
          </p>
        </header>
        <div className="shadow-soft mt-8 rounded-3xl border bg-card p-6 sm:p-8">
          <AuthForm mode="signup" />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already a member?{' '}
          <Link href="/login" className="font-medium text-foreground underline">
            Sign in
          </Link>
        </p>
      </Container>
    </section>
  );
}
