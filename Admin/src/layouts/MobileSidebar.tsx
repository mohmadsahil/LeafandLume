import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function MobileSidebar({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 max-w-[80vw] border-r p-0">
        <Sidebar className="w-full border-r-0" />
      </SheetContent>
    </Sheet>
  );
}
