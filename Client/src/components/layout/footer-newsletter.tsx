'use client';

import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setEmail('');
    toast.success("You're in", {
      description: 'Check your inbox for your welcome code.',
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full flex-col items-stretch gap-2 sm:max-w-md sm:flex-row sm:items-center"
    >
      <label htmlFor="footer-newsletter" className="sr-only">
        Email address
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="footer-newsletter"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-10 rounded-full border-border bg-background pl-9 text-sm"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        disabled={loading}
        className="h-10 w-full shrink-0 rounded-full px-4 sm:w-auto"
      >
        {loading ? (
          'Joining…'
        ) : (
          <>
            Join <ArrowRight className="size-3.5" />
          </>
        )}
      </Button>
    </form>
  );
}
