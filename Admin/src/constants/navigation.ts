import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Film,
  Search,
  ShoppingBag,
  Users,
  Star,
  MessageSquare,
  ShieldCheck,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  children?: { label: string; to: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    to: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    to: ROUTES.PRODUCTS,
    icon: Package,
    children: [
      { label: "All Products", to: ROUTES.PRODUCTS },
      { label: "Add Product", to: ROUTES.PRODUCT_NEW },
    ],
  },
  {
    label: "Banners",
    to: ROUTES.BANNERS,
    icon: ImageIcon,
    children: [
      { label: "All Banners", to: ROUTES.BANNERS },
      { label: "Add Banner", to: ROUTES.BANNER_NEW },
      { label: "Analytics", to: ROUTES.BANNER_ANALYTICS },
    ],
  },
  {
    label: "Videos",
    to: ROUTES.VIDEOS,
    icon: Film,
    children: [
      { label: "All Videos", to: ROUTES.VIDEOS },
      { label: "Reels", to: ROUTES.REELS },
      { label: "Upload Video", to: ROUTES.VIDEO_NEW },
      { label: "Analytics", to: ROUTES.VIDEO_ANALYTICS },
    ],
  },
  {
    label: "SEO",
    to: ROUTES.SEO,
    icon: Search,
    children: [
      { label: "Overview", to: ROUTES.SEO },
      { label: "Meta Pages", to: ROUTES.SEO_META },
      { label: "Redirects", to: ROUTES.SEO_REDIRECTS },
      { label: "Sitemap", to: ROUTES.SEO_SITEMAP },
    ],
  },
  {
    label: "Orders",
    to: ROUTES.ORDERS,
    icon: ShoppingBag,
    badge: "12",
  },
  {
    label: "Customers",
    to: ROUTES.CUSTOMERS,
    icon: Users,
  },
  {
    label: "Reviews",
    to: ROUTES.REVIEWS,
    icon: Star,
    children: [
      { label: "All Reviews", to: ROUTES.REVIEWS },
      { label: "Testimonials", to: ROUTES.TESTIMONIALS },
    ],
  },
  {
    label: "Contact Queries",
    to: ROUTES.QUERIES,
    icon: MessageSquare,
    badge: "5",
  },
  {
    label: "Users & Roles",
    to: ROUTES.USERS,
    icon: ShieldCheck,
    children: [
      { label: "All Users", to: ROUTES.USERS },
      { label: "Add User", to: ROUTES.USER_NEW },
      { label: "Roles & Permissions", to: ROUTES.ROLES },
      { label: "Activity Logs", to: ROUTES.ACTIVITY_LOGS },
    ],
  },
  {
    label: "Settings",
    to: ROUTES.SETTINGS,
    icon: Settings,
    children: [
      { label: "General", to: ROUTES.SETTINGS_GENERAL },
      { label: "Website", to: ROUTES.SETTINGS_WEBSITE },
      { label: "Notifications", to: ROUTES.SETTINGS_NOTIFICATIONS },
      { label: "Payments", to: ROUTES.SETTINGS_PAYMENTS },
      { label: "Shipping", to: ROUTES.SETTINGS_SHIPPING },
    ],
  },
];
