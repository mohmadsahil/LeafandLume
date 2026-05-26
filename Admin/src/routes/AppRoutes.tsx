import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { AppLayout } from "@/layouts/AppLayout";
import { PageLoader } from "@/components/common/PageLoader";

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const ProductListPage = lazy(() => import("@/pages/products/ProductListPage"));
const ProductFormPage = lazy(() => import("@/pages/products/ProductFormPage"));
const ProductDetailsPage = lazy(() => import("@/pages/products/ProductDetailsPage"));
const BannerListPage = lazy(() => import("@/pages/banners/BannerListPage"));
const BannerFormPage = lazy(() => import("@/pages/banners/BannerFormPage"));
const BannerAnalyticsPage = lazy(() => import("@/pages/banners/BannerAnalyticsPage"));
const VideoListPage = lazy(() => import("@/pages/videos/VideoListPage"));
const VideoFormPage = lazy(() => import("@/pages/videos/VideoFormPage"));
const VideoReelsPage = lazy(() => import("@/pages/videos/VideoReelsPage"));
const VideoAnalyticsPage = lazy(() => import("@/pages/videos/VideoAnalyticsPage"));
const SeoDashboardPage = lazy(() => import("@/pages/seo/SeoDashboardPage"));
const SeoMetaPage = lazy(() => import("@/pages/seo/SeoMetaPage"));
const SeoRedirectsPage = lazy(() => import("@/pages/seo/SeoRedirectsPage"));
const SeoSitemapPage = lazy(() => import("@/pages/seo/SeoSitemapPage"));
const OrderListPage = lazy(() => import("@/pages/orders/OrderListPage"));
const OrderDetailsPage = lazy(() => import("@/pages/orders/OrderDetailsPage"));
const OrderInvoicePage = lazy(() => import("@/pages/orders/OrderInvoicePage"));
const CustomerListPage = lazy(() => import("@/pages/customers/CustomerListPage"));
const CustomerDetailsPage = lazy(() => import("@/pages/customers/CustomerDetailsPage"));
const ReviewListPage = lazy(() => import("@/pages/reviews/ReviewListPage"));
const TestimonialListPage = lazy(() => import("@/pages/reviews/TestimonialListPage"));
const QueryListPage = lazy(() => import("@/pages/queries/QueryListPage"));
const QueryDetailsPage = lazy(() => import("@/pages/queries/QueryDetailsPage"));
const UserListPage = lazy(() => import("@/pages/users/UserListPage"));
const UserFormPage = lazy(() => import("@/pages/users/UserFormPage"));
const RolesPage = lazy(() => import("@/pages/users/RolesPage"));
const ActivityLogsPage = lazy(() => import("@/pages/users/ActivityLogsPage"));
const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          {/* Products */}
          <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCT_NEW} element={<ProductFormPage />} />
          <Route path={ROUTES.PRODUCT_EDIT()} element={<ProductFormPage />} />
          <Route path={ROUTES.PRODUCT_DETAILS()} element={<ProductDetailsPage />} />

          {/* Banners */}
          <Route path={ROUTES.BANNERS} element={<BannerListPage />} />
          <Route path={ROUTES.BANNER_NEW} element={<BannerFormPage />} />
          <Route path={ROUTES.BANNER_EDIT()} element={<BannerFormPage />} />
          <Route path={ROUTES.BANNER_ANALYTICS} element={<BannerAnalyticsPage />} />

          {/* Videos */}
          <Route path={ROUTES.VIDEOS} element={<VideoListPage />} />
          <Route path={ROUTES.VIDEO_NEW} element={<VideoFormPage />} />
          <Route path={ROUTES.VIDEO_EDIT()} element={<VideoFormPage />} />
          <Route path={ROUTES.REELS} element={<VideoReelsPage />} />
          <Route path={ROUTES.VIDEO_ANALYTICS} element={<VideoAnalyticsPage />} />

          {/* SEO */}
          <Route path={ROUTES.SEO} element={<SeoDashboardPage />} />
          <Route path={ROUTES.SEO_META} element={<SeoMetaPage />} />
          <Route path={ROUTES.SEO_REDIRECTS} element={<SeoRedirectsPage />} />
          <Route path={ROUTES.SEO_SITEMAP} element={<SeoSitemapPage />} />

          {/* Orders */}
          <Route path={ROUTES.ORDERS} element={<OrderListPage />} />
          <Route path={ROUTES.ORDER_DETAILS()} element={<OrderDetailsPage />} />
          <Route path={ROUTES.ORDER_INVOICE()} element={<OrderInvoicePage />} />

          {/* Customers */}
          <Route path={ROUTES.CUSTOMERS} element={<CustomerListPage />} />
          <Route path={ROUTES.CUSTOMER_DETAILS()} element={<CustomerDetailsPage />} />

          {/* Reviews */}
          <Route path={ROUTES.REVIEWS} element={<ReviewListPage />} />
          <Route path={ROUTES.TESTIMONIALS} element={<TestimonialListPage />} />

          {/* Queries */}
          <Route path={ROUTES.QUERIES} element={<QueryListPage />} />
          <Route path={ROUTES.QUERY_DETAILS()} element={<QueryDetailsPage />} />

          {/* Users */}
          <Route path={ROUTES.USERS} element={<UserListPage />} />
          <Route path={ROUTES.USER_NEW} element={<UserFormPage />} />
          <Route path={ROUTES.ROLES} element={<RolesPage />} />
          <Route path={ROUTES.ACTIVITY_LOGS} element={<ActivityLogsPage />} />

          {/* Settings */}
          <Route
            path={ROUTES.SETTINGS}
            element={<Navigate to={ROUTES.SETTINGS_GENERAL} replace />}
          />
          <Route path={ROUTES.SETTINGS_GENERAL} element={<SettingsPage section="general" />} />
          <Route path={ROUTES.SETTINGS_WEBSITE} element={<SettingsPage section="website" />} />
          <Route
            path={ROUTES.SETTINGS_NOTIFICATIONS}
            element={<SettingsPage section="notifications" />}
          />
          <Route path={ROUTES.SETTINGS_PAYMENTS} element={<SettingsPage section="payments" />} />
          <Route path={ROUTES.SETTINGS_SHIPPING} element={<SettingsPage section="shipping" />} />

          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
