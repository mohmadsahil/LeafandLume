import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { QuizClient } from './quiz-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Glow Quiz · Earn rewards',
  description:
    'Play the 60-second Glow Quiz, test your skincare IQ, and earn Glow Points to spend on your next order.',
  path: '/quiz',
});

export default function QuizPage() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.18),transparent_70%)]"
      />
      <Container size="md">
        <QuizClient />
      </Container>
    </section>
  );
}
