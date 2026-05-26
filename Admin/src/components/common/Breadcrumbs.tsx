import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  banners: "Banners",
  videos: "Videos",
  reels: "Reels",
  seo: "SEO",
  meta: "Meta",
  redirects: "Redirects",
  sitemap: "Sitemap",
  orders: "Orders",
  customers: "Customers",
  reviews: "Reviews",
  testimonials: "Testimonials",
  queries: "Queries",
  users: "Users",
  roles: "Roles & Permissions",
  activity: "Activity Logs",
  settings: "Settings",
  general: "General",
  website: "Website",
  notifications: "Notifications",
  payments: "Payments",
  shipping: "Shipping",
  new: "Create",
  edit: "Edit",
  invoice: "Invoice",
  analytics: "Analytics",
};

function humanize(segment: string) {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  if (/^[0-9a-f-]{6,}$/i.test(segment)) return "#" + segment.slice(0, 8);
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, idx) => {
    const path = "/" + segments.slice(0, idx + 1).join("/");
    return { label: humanize(seg), path };
  });

  const rootLabel =
    NAV_ITEMS.find((n) => n.to === "/" + segments[0])?.label ?? humanize(segments[0]);
  crumbs[0] = { ...crumbs[0], label: rootLabel };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={c.path} className="flex items-center">
            <ChevronRight className="mx-1.5 h-3.5 w-3.5 text-border" />
            {isLast ? (
              <span className={cn("font-medium text-foreground")}>{c.label}</span>
            ) : (
              <Link
                to={c.path}
                className="hover:text-foreground transition-colors"
              >
                {c.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
