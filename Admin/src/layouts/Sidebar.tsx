import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight, HelpCircle, Sparkles } from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/constants/navigation";
import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function SidebarItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const { pathname } = useLocation();
  const isActiveSelf = pathname === item.to;
  const isActiveChild = !!item.children?.some((c) => pathname === c.to || pathname.startsWith(c.to + "/"));
  const isActive = isActiveSelf || isActiveChild || pathname.startsWith(item.to + "/");
  const Icon = item.icon;
  const [open, setOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  const hasChildren = !!item.children?.length;

  return (
    <div className="space-y-0.5">
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-leaf-50 text-leaf-800"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4 shrink-0",
              isActive ? "text-leaf-600" : "text-muted-foreground group-hover:text-foreground",
            )}
          />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="default" className="px-1.5 py-0 text-[10px]">
              {item.badge}
            </Badge>
          )}
          <ChevronRight
            className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-90")}
          />
        </button>
      ) : (
        <NavLink
          to={item.to}
          end
          className={({ isActive: a }) =>
            cn(
              "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              a
                ? "bg-leaf-50 text-leaf-800"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              depth > 0 && "pl-9",
            )
          }
        >
          {({ isActive: a }) => (
            <>
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  a ? "text-leaf-600" : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge variant="default" className="px-1.5 py-0 text-[10px]">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      )}

      {hasChildren && open && (
        <div className="ml-5 mt-1 space-y-0.5 border-l border-border pl-3">
          {item.children!.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              end
              className={({ isActive: a }) =>
                cn(
                  "block rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                  a
                    ? "bg-leaf-50 text-leaf-800"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )
              }
            >
              {c.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const items = useMemo(() => NAV_ITEMS, []);
  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border bg-white",
        className,
      )}
    >
      <div className="flex h-16 items-center px-5 border-b border-border">
        <Logo />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 scrollbar-none">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Main
        </p>
        {items.map((item) => (
          <SidebarItem key={item.to} item={item} />
        ))}
      </nav>

      <div className="m-3 rounded-xl border border-leaf-100 bg-gradient-to-br from-leaf-50 to-white p-4">
        <div className="flex items-center gap-2 text-leaf-700">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Pro tip</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-foreground">
          Boost conversions with curated skincare bundles for spring.
        </p>
        <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-leaf-700 hover:underline">
          <HelpCircle className="h-3 w-3" /> Open guide
        </button>
      </div>
    </aside>
  );
}
