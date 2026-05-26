'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container size="md" className="py-24 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle aria-hidden />
      </div>
      <h2 className="mt-6 font-heading text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">
        An unexpected error occurred. You can try again, or head back home.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </Container>
  );
}
