import * as React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type FileDropzoneProps = {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
  hint?: string;
  className?: string;
};

export function FileDropzone({
  onFiles,
  multiple = true,
  accept = "image/*",
  label = "Drop files here or click to upload",
  hint = "PNG, JPG up to 10MB",
  className,
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);

  const handle = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    onFiles(multiple ? arr : arr.slice(0, 1));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 px-6 py-10 text-center transition-colors",
        dragOver
          ? "border-primary bg-leaf-50/60"
          : "border-border hover:border-primary/40 hover:bg-leaf-50/30",
        className,
      )}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-soft ring-1 ring-border">
        <UploadCloud className="h-5 w-5" />
      </div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handle(e.target.files)}
      />
    </div>
  );
}
