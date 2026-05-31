'use client';

import { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/layout/container';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setEmail('');
    toast.success("You're in", { description: 'Check your inbox for your welcome code.' });
  };

  return (
    <section aria-labelledby="newsletter" className="py-16 sm:py-20">
      <Container size="md">
        <div className="shadow-luxury relative overflow-hidden rounded-[2rem] bg-foreground p-6 text-background sm:p-8 md:p-12">
          <div className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 size-56 rounded-full bg-amber-200/20 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur">
              <Sparkles className="size-3" aria-hidden />
              Glow letter
            </span>
            <h2
              id="newsletter"
              className="mt-4 max-w-xl text-balance font-heading text-2xl font-semibold leading-tight xs:text-3xl sm:text-4xl"
            >
              Get 10% off your first order — and a monthly drop of skincare wisdom.
            </h2>
            <p className="mt-3 max-w-md text-sm text-background/70">
              Routines, ingredient deep-dives and quiet launches. No spam, unsubscribe in a tap.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/50" />
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@youremail.com"
                  className="h-12 rounded-full border-0 bg-background pl-10 text-foreground placeholder:text-foreground/40"
                />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="h-12 rounded-full">
                {loading ? 'Joining…' : 'Get my 10% off'}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
