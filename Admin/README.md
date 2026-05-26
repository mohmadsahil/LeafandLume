# Leaf & Lume — Admin Dashboard

A premium, production-ready admin dashboard for the Leaf & Lume skincare eCommerce brand.

Built with **React + Vite + TypeScript**, styled with **TailwindCSS** and a custom shadcn-style UI kit, charting with **Recharts**, data with **TanStack Query + Axios**, forms with **React Hook Form + Zod**, motion with **Framer Motion** and toasts via **Sonner**.

## Tech Stack
- ReactJS 18 · Vite 5 · TypeScript 5
- Tailwind CSS + shadcn-style primitives (Radix UI)
- React Router DOM 6 (lazy routes, protected layout, dynamic breadcrumbs)
- TanStack React Query 5
- Axios (services scaffolded — currently using mock JSON)
- Lucide React icons
- React Hook Form + Zod
- Framer Motion
- Recharts
- Sonner toasts

## Modules
- Dashboard — KPI cards, charts, recent activity, top products, low inventory
- Products — list, add/edit (8 sections), details, variants, images
- Banners — list, add/edit, analytics
- Videos — list, upload, reels, analytics
- SEO — overview, meta pages, redirects, sitemap
- Orders — list, details, invoice
- Customers — list, profile, addresses, wishlist, subscriptions
- Reviews & Testimonials — moderation, featured grid
- Contact Queries — ticketing, reply modal
- Users & Roles — list, add, role matrix, activity logs
- Settings — general, website, notifications, payments, shipping

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run typecheck
```

## Folder Structure
```
src/
 ├── api/             axios instance + endpoints
 ├── assets/
 ├── components/
 │   ├── cards/       StatsCard
 │   ├── charts/      Revenue, Orders, Customer, Sales, Traffic donut
 │   ├── common/      Breadcrumbs, PageHeader, EmptyState, Pagination, SearchInput, StatusBadge…
 │   ├── modals/      Modal, ConfirmDialog, DrawerSheet
 │   ├── tables/      DataTable
 │   ├── ui/          shadcn-style primitives
 │   └── upload/      FileDropzone, ImagePreviewGrid
 ├── constants/       app, navigation, routes
 ├── hooks/           useProducts, useOrders, useCustomers, useBanners, useVideos, useReviews, useSEO, useUsers, useDashboard, useQueries, useDebounced
 ├── layouts/         AppLayout, Sidebar, MobileSidebar, TopNavbar
 ├── lib/             utils, queryClient
 ├── mock/            JSON seeds for all modules
 ├── pages/           feature-grouped pages
 ├── routes/          AppRoutes (lazy + Suspense)
 ├── services/        product, order, customer, banner, video, review, seo, user, dashboard, query
 ├── types/           strict TS types per domain
 ├── App.tsx
 └── main.tsx
```

All services are mock-backed today (`USE_MOCK = true`); flip to `false` and point `VITE_API_URL` at your API to go live.
