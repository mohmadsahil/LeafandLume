import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeMap = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

export function Container({
  as: Tag = 'div',
  size = 'xl',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)} {...props}>
      {children}
    </Tag>
  );
}
