# Leaf & Lume — Premium Skincare Storefront

A production-ready, mobile-first Next.js 15 storefront inspired by modern D2C skincare brands (Foxtale, Dot & Key). Built with the App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Embla, Redux Toolkit and React Query.

## Setup

```powershell
# 1. Install
npm install

# 2. Env vars (PowerShell)
Copy-Item .env.example .env.local

# 3. One-time hook setup
npm run prepare
```

Edit `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Leaf and Lume
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Run

```powershell
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build
npm run start        # Run prod build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run format       # Prettier
```

## Tech stack

| Layer         | Choice                                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 15 (App Router, React 19, Server Components first)                                                                 |
| Language      | TypeScript 5, strict mode                                                                                                  |
| Styling       | Tailwind CSS 3.4 + CSS variables + animate plugin                                                                          |
| UI primitives | shadcn/ui (button, input, card, badge, dialog, sheet, tabs, accordion, dropdown, separator, scroll-area, skeleton) + Radix |
| Carousels     | Embla Carousel (+ autoplay plugin)                                                                                         |
| Animation     | Framer Motion                                                                                                              |
| State         | Redux Toolkit + React-Redux (cart, wishlist, ui)                                                                           |
| Data          | TanStack Query (+ devtools)                                                                                                |
| Forms         | React Hook Form + Zod + Sonner toasts                                                                                      |
| HTTP          | Axios                                                                                                                      |
| Icons         | Lucide                                                                                                                     |
| Theming       | next-themes (light / dark / system)                                                                                        |
| Fonts         | next/font — Inter (body) + Fraunces (display)                                                                              |

## Brand

- **Primary**: `#879e3d` (olive)
- **Background**: `#fffefc` (warm cream)
- HSL CSS variables in `src/app/globals.css`

## Pages (18)

| Route                         | Purpose                                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                           | Home — Hero carousel, trending, bestsellers, reels, promos, categories, concerns, ingredients, routine, testimonials, IG gallery, newsletter |
| `/shop`                       | Filterable + sortable product listing                                                                                                        |
| `/product/[slug]`             | Product detail — gallery, benefits, ingredients, accordion, related                                                                          |
| `/cart`                       | Full cart with coupon apply                                                                                                                  |
| `/checkout`                   | Multi-step checkout (address → payment → review → success)                                                                                   |
| `/wishlist`                   | Saved products grid                                                                                                                          |
| `/login`, `/signup`           | Auth forms (UI only)                                                                                                                         |
| `/orders`                     | Order history with status                                                                                                                    |
| `/coupons`                    | Coupon cards with copy-code                                                                                                                  |
| `/profile`                    | Account dashboard                                                                                                                            |
| `/about`, `/contact`          | Brand pages                                                                                                                                  |
| `/faq`, `/privacy`, `/terms`  | Help & legal                                                                                                                                 |
| `/sitemap.xml`, `/robots.txt` | Auto-generated SEO                                                                                                                           |
| `/_not-found`                 | Custom 404                                                                                                                                   |

## Folder structure

```
src/
├── app/                      ← App Router pages + route handlers
│   ├── (each page is its own folder)
│   ├── globals.css           ← Tailwind layers + brand tokens
│   ├── layout.tsx            ← Fonts, providers, navbar, footer, bottom-nav
│   ├── sitemap.ts · robots.ts
│   └── error.tsx · loading.tsx · not-found.tsx
├── components/
│   ├── ui/                   ← Reusable UI primitives (shadcn)
│   ├── layout/               ← navbar, footer, container, bottom-nav
│   ├── sections/             ← 12 home-page sections
│   ├── product/              ← product-card, product-grid, quick-view, wishlist & add-to-cart buttons
│   ├── cart/                 ← cart-item, cart-drawer
│   ├── reels/                ← reel-card
│   ├── common/               ← logo, theme-toggle, section-header, empty-state, coupon-card, auth-form, rating-stars
│   └── animations/           ← framer-motion wrappers (fade-in, stagger)
├── data/                     ← static product/category/reel/testimonial/coupon/faq data
├── hooks/                    ← use-mobile, use-debounce
├── lib/                      ← cn (utils), env (Zod), seo (buildMetadata)
├── providers/                ← Theme + Redux + React Query + Toaster + CartDrawer
├── services/api/             ← Axios client + endpoints
├── store/                    ← Redux store + slices (ui, cart, wishlist) + typed hooks
├── constants/                ← site config, main + mega + bottom + footer nav
├── types/                    ← Product, Coupon, Reel, etc.
├── utils/                    ← formatCompactNumber, formatDate, slugify, truncate
├── assets/ · styles/         ← (reserved)
└── middleware.ts             ← edge middleware example (forwards pathname)
```

## What's wired up

### Cart & wishlist

- **Redux Toolkit** slices with `addToCart`, `updateQuantity`, `removeFromCart`, `applyCoupon`, `toggleWishlist`
- **Floating cart drawer** opens from any page; sticky bottom nav shows live counts
- **Coupon engine** validates `minOrder` and `expired` from `/src/data/coupons.ts`

### Animations (Framer Motion)

- Hero slide enter/exit
- Product card hover lift + image zoom
- Wishlist heart pop, add-to-cart check swap
- Cart drawer slide, mobile menu slide
- Carousel transitions (Embla)
- `FadeIn` + `StaggerChildren` wrappers for scroll-reveal
- Animated underline pill on the mobile bottom nav (`layoutId`)

### Premium navbar

- Sticky, transparent on `/`, solid+blurred on scroll or any other page
- Hover-open mega menu (Categories / Concerns / Ingredients)
- Mobile sheet drawer with full nav
- Live cart + wishlist badges

### SEO

- `metadataBase`, title template, OG + Twitter cards in root layout
- Per-page metadata via `buildMetadata()` helper
- Static + dynamic (product) entries in `sitemap.xml`
- `robots.txt` via App Router
- `generateStaticParams` on product pages

### Performance

- Server Components by default (only interactive surfaces are client)
- `next/image` everywhere with AVIF/WebP, sized `sizes`, `priority` on above-the-fold
- `next/font` self-hosted Inter + Fraunces
- `experimental.optimizePackageImports` for `lucide-react`
- Security headers in `next.config.mjs`

## Build & deploy

```powershell
npm run build
npm run start
```

Deploys cleanly to Vercel — set the env vars from `.env.example` in your host.

## License

MIT
