import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  value: number;
  outOf?: number;
  size?: number;
  color?: 'amber' | 'green';
  className?: string;
}

const colorMap = {
  amber: 'fill-amber-400 text-amber-400',
  green: 'fill-green-500 text-green-500',
} as const;

export function RatingStars({
  value,
  outOf = 5,
  size = 14,
  color = 'amber',
  className,
}: RatingStarsProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={`${value} out of ${outOf} stars`}
    >
      {Array.from({ length: outOf }, (_, i) => {
        const filled = i + 1 <= Math.round(value);
        return (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={cn(filled ? colorMap[color] : 'fill-muted text-muted')}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
