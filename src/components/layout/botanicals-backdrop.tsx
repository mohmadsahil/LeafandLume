import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BotanicalsBackdropProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared cream-gradient + dotted grid + blob + leaf backdrop used to visually
 * merge the Concerns, Ingredients, and Routine sections into one continuous
 * canvas. Each child section should keep its padding but render NO backdrop
 * of its own.
 */
export function BotanicalsBackdrop({ children, className }: BotanicalsBackdropProps) {
  return (
    <div className={cn('relative isolate overflow-hidden', className)}>
      <div aria-hidden className="bg-cream-gradient absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(135, 158, 61, 0.2) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 80%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 -z-10 size-80 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-96 -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
      />

      <Leaf
        aria-hidden
        className="pointer-events-none absolute left-2 top-28 -z-10 size-28 -rotate-12 text-primary/10 sm:left-8"
      />
      <Leaf
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 -z-10 size-32 -rotate-45 text-primary/[0.07] sm:right-16"
      />
      <Leaf
        aria-hidden
        className="pointer-events-none absolute bottom-24 right-4 -z-10 size-36 rotate-45 text-primary/10 sm:right-12"
      />
      <Leaf
        aria-hidden
        className="pointer-events-none absolute bottom-1/3 left-4 -z-10 size-24 rotate-12 text-primary/[0.07] sm:left-10"
      />

      {children}
    </div>
  );
}
