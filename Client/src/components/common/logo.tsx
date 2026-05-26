import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/constants/site';
import { cn } from '@/lib/utils';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  className?: string;
  size?: LogoSize;
  priority?: boolean;
}

const sizeMap: Record<LogoSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-14',
  xl: 'h-20',
};

export function Logo({ className, size = 'md', priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn('inline-flex items-center', className)}
    >
      <Image
        src="/logo.png"
        alt={siteConfig.name}
        width={400}
        height={400}
        priority={priority}
        className={cn('w-auto object-contain', sizeMap[size])}
      />
    </Link>
  );
}
