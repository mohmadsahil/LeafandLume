import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type DrawerProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  side?: "left" | "right";
  children: ReactNode;
  footer?: ReactNode;
};

export function DrawerSheet({
  open,
  onOpenChange,
  title,
  description,
  side = "right",
  children,
  footer,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className="flex w-full flex-col p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-border">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <SheetFooter className="border-t border-border">{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
