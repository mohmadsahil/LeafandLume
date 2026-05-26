import { Star, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  id: string;
  url: string;
  isFeatured?: boolean;
  alt?: string;
};

type Props = {
  images: GalleryImage[];
  onRemove?: (id: string) => void;
  onSetFeatured?: (id: string) => void;
  className?: string;
};

export function ImagePreviewGrid({ images, onRemove, onSetFeatured, className }: Props) {
  if (images.length === 0) return null;
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {images.map((img) => (
        <div
          key={img.id}
          className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/40 shadow-soft"
        >
          <img
            src={img.url}
            alt={img.alt ?? "Preview"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {img.isFeatured && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-leaf-600/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              <Star className="h-3 w-3 fill-current" /> Featured
            </span>
          )}
          <div className="absolute inset-0 hidden items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-2 group-hover:flex">
            <button
              type="button"
              onClick={() => onSetFeatured?.(img.id)}
              className="inline-flex h-7 items-center gap-1 rounded-md bg-white/90 px-2 text-[11px] font-medium text-foreground shadow-soft hover:bg-white"
            >
              <Star className="h-3 w-3" /> Set featured
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-foreground shadow-soft hover:bg-white"
                aria-label="Drag to reorder"
              >
                <GripVertical className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onRemove?.(img.id)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-red-600 shadow-soft hover:bg-white"
                aria-label="Remove"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
