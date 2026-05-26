import ordersMock from "@/mock/orders.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { Order } from "@/types/order";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = ordersMock as unknown as Order[];

export const orderService = {
  async list(params: QueryParams = {}): Promise<Paginated<Order>> {
    if (USE_MOCK) {
      let filtered = filterAndSort(seed, params, ["orderNumber"]);
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(s) ||
            o.customer.name.toLowerCase().includes(s) ||
            o.customer.email.toLowerCase().includes(s),
        );
      }
      if (params.status) filtered = filtered.filter((o) => o.orderStatus === params.status);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<Order>>(endpoints.orders.list, { params });
    return data;
  },

  async get(id: string): Promise<Order | undefined> {
    if (USE_MOCK) return mockResponse(seed.find((o) => o.id === id || o.orderNumber === id));
    const { data } = await api.get<Order>(endpoints.orders.detail(id));
    return data;
  },

  async update(id: string, payload: Partial<Order>): Promise<Order> {
    if (USE_MOCK) {
      const existing = seed.find((o) => o.id === id) as Order;
      return mockResponse({ ...existing, ...payload });
    }
    const { data } = await api.put<Order>(endpoints.orders.update(id), payload);
    return data;
  },
};
