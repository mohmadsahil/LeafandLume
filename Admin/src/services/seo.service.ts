import seoMock from "@/mock/seo.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { SeoOverview, SeoPage, SeoRedirect } from "@/types/seo";
import { mockResponse } from "./mock-helpers";

const USE_MOCK = true;

export const seoService = {
  async overview(): Promise<SeoOverview> {
    if (USE_MOCK) return mockResponse(seoMock.overview as SeoOverview);
    const { data } = await api.get<SeoOverview>(endpoints.seo.overview);
    return data;
  },

  async pages(): Promise<SeoPage[]> {
    if (USE_MOCK) return mockResponse(seoMock.pages as SeoPage[]);
    const { data } = await api.get<SeoPage[]>(endpoints.seo.pages);
    return data;
  },

  async redirects(): Promise<SeoRedirect[]> {
    if (USE_MOCK) return mockResponse(seoMock.redirects as SeoRedirect[]);
    const { data } = await api.get<SeoRedirect[]>(endpoints.seo.redirects);
    return data;
  },
};
