import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { AuthForm } from '@/components/common/auth-form';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Sign in',
  description: 'Sign in to your Leaf & Lume account.',
  path: '/login',
  noIndex: true,
});

export default function LoginPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="sm">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Welcome back
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your routine, your orders, your saves — all here.
          </p>
        </header>
        <div className="shadow-soft mt-8 rounded-3xl border bg-card p-6 sm:p-8">
          <AuthForm mode="login" />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{' '}
          <Link href="/signup" className="font-medium text-foreground underline">
            Create an account
          </Link>
        </p>
      </Container>
    </section>
  );
}
