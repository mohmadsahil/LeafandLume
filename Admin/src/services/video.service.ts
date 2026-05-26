import videosMock from "@/mock/videos.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Video } from "@/types/video";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = videosMock as unknown as Video[];

export const videoService = {
  async list(params: QueryParams = {}): Promise<Paginated<Video>> {
    if (USE_MOCK) {
      const filtered = filterAndSort(seed, params, ["title", "type"]);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Video>>(endpoints.videos.list, { params });
    return data;
  },

  async get(id: string): Promise<Video | undefined> {
    if (USE_MOCK) return mockResponse(seed.find((v) => v.id === id));
    const { data } = await api.get<Video>(endpoints.videos.detail(id));
    return data;
  },

  async create(payload: Partial<Video>): Promise<Video> {
    if (USE_MOCK) return mockResponse({ ...(seed[0] as Video), ...payload, id: "v_new_" + Date.now() });
    const { data } = await api.post<Video>(endpoints.videos.create, payload);
    return data;
  },

  async remove(id: string) {
    if (USE_MOCK) return mockResponse({ ok: true });
    await api.delete(endpoints.videos.remove(id));
    return { ok: true };
  },
};
