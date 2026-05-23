'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { ReduxProvider } from './redux-provider';
import { Toaster } from '@/components/ui/sonner';
import { CartDrawer } from '@/components/cart/cart-drawer';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <ReduxProvider>
        <QueryProvider>
          {children}
          <CartDrawer />
          <Toaster />
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
