import queriesMock from "@/mock/queries.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Query } from "@/types/query";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = queriesMock as unknown as Query[];

export const queryService = {
  async list(params: QueryParams = {}): Promise<Paginated<Query>> {
    if (USE_MOCK) {
      let filtered = [...seed];
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(
          (q) =>
            q.name.toLowerCase().includes(s) ||
            q.email.toLowerCase().includes(s) ||
            q.subject.toLowerCase().includes(s),
        );
      }
      if (params.status) filtered = filtered.filter((q) => q.status === params.status);
      filtered = filterAndSort(filtered, params, []);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Query>>(endpoints.queries.list, { params });
    return data;
  },

  async get(id: string): Promise<Query | undefined> {
    if (USE_MOCK) return mockResponse(seed.find((q) => q.id === id));
    const { data } = await api.get<Query>(endpoints.queries.detail(id));
    return data;
  },

  async reply(id: string, message: string) {
    if (USE_MOCK) return mockResponse({ ok: true, message });
    await api.post(endpoints.queries.reply(id), { message });
    return { ok: true };
  },
};
