import reviewsMock from "@/mock/reviews.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Review } from "@/types/review";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = reviewsMock as unknown as Review[];

export const reviewService = {
  async list(params: QueryParams = {}): Promise<Paginated<Review>> {
    if (USE_MOCK) {
      let filtered = [...seed];
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.customer.name.toLowerCase().includes(s) ||
            r.product.name.toLowerCase().includes(s) ||
            (r.text ?? "").toLowerCase().includes(s),
        );
      }
      if (params.status) filtered = filtered.filter((r) => r.status === params.status);
      filtered = filterAndSort(filtered, params, []);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Review>>(endpoints.reviews.list, { params });
    return data;
  },

  async approve(id: string) {
    if (USE_MOCK) return mockResponse({ ok: true });
    await api.post(endpoints.reviews.approve(id));
    return { ok: true };
  },

  async reject(id: string) {
    if (USE_MOCK) return mockResponse({ ok: true });
    await api.post(endpoints.reviews.reject(id));
    return { ok: true };
  },
};
