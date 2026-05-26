import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function EmptyState({ icon: Icon, title, description, ctaHref, ctaLabel }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
      <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-7" aria-hidden />
      </div>
      <h3 className="mt-5 font-heading text-xl font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {ctaHref && (
        <Button asChild className="mt-6">
          <Link href={ctaHref}>{ctaLabel ?? 'Continue'}</Link>
        </Button>
      )}
    </div>
  );
}
