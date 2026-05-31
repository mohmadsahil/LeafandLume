'use client';

import { useMemo, useRef, useState } from 'react';
import { Camera, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAvatar } from '@/store/slices/profile-slice';

const MAX_BYTES = 5 * 1024 * 1024;
const TARGET_SIZE = 256;

function tierName(points: number) {
  if (points >= 2500) return 'Platinum';
  if (points >= 1000) return 'Gold';
  if (points >= 300) return 'Silver';
  return 'Bronze';
}

function defaultAvatarUrl(name: string) {
  const seed = encodeURIComponent(name || 'leaf');
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=fef3c7`;
}

async function resizeImageFile(file: File): Promise<string> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Could not read image'));
      el.src = objectUrl;
    });
    const canvas = document.createElement('canvas');
    canvas.width = TARGET_SIZE;
    canvas.height = TARGET_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');
    const ratio = Math.max(TARGET_SIZE / img.width, TARGET_SIZE / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    ctx.drawImage(img, (TARGET_SIZE - w) / 2, (TARGET_SIZE - h) / 2, w, h);
    return canvas.toDataURL('image/webp', 0.85);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function ProfileCard() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((s) => s.profile.name);
  const avatar = useAppSelector((s) => s.profile.avatar);
  const points = useAppSelector((s) => s.rewards.points);
  const history = useAppSelector((s) => s.rewards.history);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const savedDollars = useMemo(() => {
    const redeemed = history.filter((h) => h.points < 0).reduce((sum, h) => sum + -h.points, 0);
    return redeemed / 100;
  }, [history]);

  const avatarSrc = avatar ?? defaultAvatarUrl(name);
  const openPicker = () => fileRef.current?.click();

  const onFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error('Image too large — max 5 MB');
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await resizeImageFile(file);
      dispatch(setAvatar(dataUrl));
      toast.success('Photo updated');
    } catch {
      toast.error('Could not process that image');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    dispatch(setAvatar(null));
    toast.success('Reverted to default avatar');
  };

  return (
    <Card className="shadow-soft relative overflow-hidden rounded-3xl border bg-card">
      <CardContent className="relative p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="relative size-16 overflow-hidden rounded-full bg-secondary ring-2 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt={name}
                className="size-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = defaultAvatarUrl('leaf');
                }}
              />
            </div>
            <button
              type="button"
              onClick={openPicker}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-card transition-transform hover:scale-105 disabled:opacity-70"
              aria-label={avatar ? 'Change photo' : 'Upload photo'}
            >
              {uploading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Camera className="size-3.5" />
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="truncate font-heading text-2xl font-semibold">{name}</h1>
            <Badge variant="soft" className="mt-2">
              <Sparkles className="mr-1 size-3" /> Glow Insider · {tierName(points)}
            </Badge>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <Stat label="Orders" value="12" />
          <Stat label="Points" value={points.toLocaleString()} />
          <Stat label="Saved" value={`$${savedDollars.toFixed(0)}`} />
        </div>

        {avatar && (
          <button
            type="button"
            onClick={removePhoto}
            className="relative mt-4 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Remove uploaded photo
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-3">
      <div className="font-heading text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}
