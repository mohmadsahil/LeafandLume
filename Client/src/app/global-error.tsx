'use client';

import { useEffect } from 'react';

/**
 * Root-level error boundary. Required by Next.js to recover from errors
 * thrown in the root layout itself (where `error.tsx` cannot run because
 * the layout never mounted). Must render its own <html> and <body>.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#fffefc' }}>
        <main
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            color: '#1a1f10',
          }}
        >
          <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
            <p
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#879e3d',
                fontWeight: 600,
                margin: 0,
              }}
            >
              Something went wrong
            </p>
            <h1
              style={{
                margin: '0.75rem 0 1rem',
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              We hit an unexpected hiccup.
            </h1>
            <p style={{ margin: '0 0 1.5rem', color: '#5b6048' }}>
              Try again, or head back to the home page.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: '#879e3d',
                  color: '#fffefc',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  border: '1px solid #d0d4c0',
                  background: 'transparent',
                  color: '#1a1f10',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Go home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
