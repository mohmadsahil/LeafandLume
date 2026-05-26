import { useState } from "react";
import { Bell, ChevronDown, LifeBuoy, LogOut, Menu, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

type Props = {
  onOpenMobileNav: () => void;
};

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New order #LL-30214",
    description: "Aria placed a $128 order for Hydrating Serum.",
    at: "2m ago",
    tone: "leaf",
  },
  {
    id: "2",
    title: "Low stock alert",
    description: "Vitamin C Brightening Cream is below threshold (8 left).",
    at: "26m ago",
    tone: "amber",
  },
  {
    id: "3",
    title: "Pending review",
    description: "Mia submitted a 5★ review for Rose Glow Toner.",
    at: "1h ago",
    tone: "sky",
  },
];

export function TopNavbar({ onOpenMobileNav }: Props) {
  const [query, setQuery] = useState("");
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/85 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden lg:block">
          <Breadcrumbs />
        </div>

        <div className="flex-1" />

        <SearchInput
          placeholder="Search products, orders, customers…"
          containerClassName="hidden md:block w-[320px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-leaf-600 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <DropdownMenuLabel className="p-0 text-sm font-semibold normal-case">
                Notifications
              </DropdownMenuLabel>
              <Badge variant="default" className="text-[10px]">
                3 new
              </Badge>
            </div>
            <div className="max-h-[380px] overflow-y-auto py-1.5">
              {NOTIFICATIONS.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex items-start gap-3 px-4 py-3"
                  onSelect={(e) => e.preventDefault()}
                >
                  <span
                    className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-leaf-500"
                    aria-hidden
                  />
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.description}</p>
                    <p className="text-[11px] text-muted-foreground">{n.at}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="soft" size="sm" className="w-full">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-border bg-white py-1 pl-1 pr-2.5 text-left text-sm shadow-soft hover:bg-muted/40">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/64?img=47" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="text-xs font-semibold text-foreground">Sahil Admin</span>
                <span className="text-[10px] text-muted-foreground">Super Admin</span>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <User className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={ROUTES.SETTINGS_GENERAL}>
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="h-4 w-4" /> Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem danger>
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
