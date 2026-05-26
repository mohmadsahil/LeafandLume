import bannersMock from "@/mock/banners.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Banner } from "@/types/banner";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = bannersMock as unknown as Banner[];

export const bannerService = {
  async list(params: QueryParams = {}): Promise<Paginated<Banner>> {
    if (USE_MOCK) {
      const filtered = filterAndSort(seed, params, ["title", "type", "position"]);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Banner>>(endpoints.banners.list, { params });
    return data;
  },

  async get(id: string): Promise<Banner | undefined> {
    if (USE_MOCK) return mockResponse(seed.find((b) => b.id === id));
    const { data } = await api.get<Banner>(endpoints.banners.detail(id));
    return data;
  },

  async create(payload: Partial<Banner>): Promise<Banner> {
    if (USE_MOCK) return mockResponse({ ...(seed[0] as Banner), ...payload, id: "b_new_" + Date.now() });
    const { data } = await api.post<Banner>(endpoints.banners.create, payload);
    return data;
  },

  async update(id: string, payload: Partial<Banner>): Promise<Banner> {
    if (USE_MOCK) {
      const existing = seed.find((b) => b.id === id) as Banner;
      return mockResponse({ ...existing, ...payload });
    }
    const { data } = await api.put<Banner>(endpoints.banners.update(id), payload);
    return data;
  },

  async remove(id: string): Promise<{ ok: boolean }> {
    if (USE_MOCK) return mockResponse({ ok: true });
    await api.delete(endpoints.banners.remove(id));
    return { ok: true };
  },
};
