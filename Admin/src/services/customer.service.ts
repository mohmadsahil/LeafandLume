import customersMock from "@/mock/customers.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Customer } from "@/types/customer";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = customersMock as unknown as Customer[];

export const customerService = {
  async list(params: QueryParams = {}): Promise<Paginated<Customer>> {
    if (USE_MOCK) {
      const filtered = filterAndSort(seed, params, ["name", "email", "phone"]);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Customer>>(endpoints.customers.list, { params });
    return data;
  },

  async get(id: string): Promise<Customer | undefined> {
    if (USE_MOCK) return mockResponse(seed.find((c) => c.id === id));
    const { data } = await api.get<Customer>(endpoints.customers.detail(id));
    return data;
  },
};
