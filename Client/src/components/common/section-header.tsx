import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel = 'View all',
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        isCenter ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-xl', isCenter && 'mx-auto')}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1 self-start text-sm font-medium text-foreground/80 transition-colors hover:text-primary sm:self-end"
        >
          {ctaLabel} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
