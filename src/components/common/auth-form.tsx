'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    toast.success(mode === 'login' ? 'Signed in' : 'Welcome to Leaf & Lume');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {mode === 'signup' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="first">First name</Label>
            <Input id="first" autoComplete="given-name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" autoComplete="family-name" required />
          </div>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" autoComplete="email" required className="pl-9" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={show ? 'text' : 'password'}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {mode === 'login' && (
        <div className="flex justify-end">
          <a
            href="#"
            className="text-xs font-medium text-foreground/70 underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      )}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? 'Just a sec…' : mode === 'login' ? 'Sign in' : 'Create account'}
      </Button>

      <div className="flex items-center gap-3 py-1">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <Button type="button" variant="outline" size="lg" className="w-full">
        Continue with Google
      </Button>
    </form>
  );
}
