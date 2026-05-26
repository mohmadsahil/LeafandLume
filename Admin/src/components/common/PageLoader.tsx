import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
