import productsMock from "@/mock/products.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Product } from "@/types/product";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;

const seed = productsMock as unknown as Product[];

export const productService = {
  async list(params: QueryParams = {}): Promise<Paginated<Product>> {
    if (USE_MOCK) {
      const filtered = filterAndSort(seed, params, ["name", "sku", "category", "brand"]);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Product>>(endpoints.products.list, { params });
    return data;
  },

  async get(id: string): Promise<Product | undefined> {
    if (USE_MOCK) return mockResponse(seed.find((p) => p.id === id));
    const { data } = await api.get<Product>(endpoints.products.detail(id));
    return data;
  },

  async create(payload: Partial<Product>): Promise<Product> {
    if (USE_MOCK) {
      const fresh: Product = {
        ...(seed[0] as Product),
        ...(payload as Product),
        id: "p_new_" + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockResponse(fresh);
    }
    const { data } = await api.post<Product>(endpoints.products.create, payload);
    return data;
  },

  async update(id: string, payload: Partial<Product>): Promise<Product> {
    if (USE_MOCK) {
      const existing = seed.find((p) => p.id === id);
      return mockResponse({ ...(existing as Product), ...(payload as Product), id });
    }
    const { data } = await api.put<Product>(endpoints.products.update(id), payload);
    return data;
  },

  async remove(id: string): Promise<{ ok: boolean }> {
    if (USE_MOCK) return mockResponse({ ok: true });
    await api.delete(endpoints.products.remove(id));
    return { ok: true };
  },

  async duplicate(id: string): Promise<Product> {
    if (USE_MOCK) {
      const found = seed.find((p) => p.id === id) as Product;
      return mockResponse({ ...found, id: "p_dup_" + Date.now(), name: `${found.name} (Copy)` });
    }
    const { data } = await api.post<Product>(endpoints.products.duplicate(id));
    return data;
  },
};
