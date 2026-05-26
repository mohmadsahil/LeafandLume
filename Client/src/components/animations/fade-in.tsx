'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'ul' | 'li';
  once?: boolean;
}

const variants: Variants = {
  hidden: (custom: number) => ({ opacity: 0, y: custom }),
  visible: (_custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function FadeIn({
  children,
  delay = 0,
  y = 16,
  className,
  as = 'div',
  once = true,
}: FadeInProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={y}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerChildren({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren, staggerChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
