import usersMock from "@/mock/users.json";
import activityMock from "@/mock/activity.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { ActivityLog, User } from "@/types/user";
import type { Paginated, QueryParams } from "@/types/common";
import { filterAndSort, mockResponse, paginate } from "./mock-helpers";

const USE_MOCK = true;
const seed = usersMock as unknown as User[];
const activitySeed = activityMock as unknown as ActivityLog[];

export const userService = {
  async list(params: QueryParams = {}): Promise<Paginated<User>> {
    if (USE_MOCK) {
      const filtered = filterAndSort(seed, params, ["name", "email", "role"]);
      return mockResponse(paginate(filtered, params));
    }
    const { data } = await api.get<Paginated<User>>(endpoints.users.list, { params });
    return data;
  },

  async get(id: string) {
    if (USE_MOCK) return mockResponse(seed.find((u) => u.id === id));
    const { data } = await api.get<User>(endpoints.users.detail(id));
    return data;
  },

  async create(payload: Partial<User>): Promise<User> {
    if (USE_MOCK) return mockResponse({ ...(seed[0] as User), ...payload, id: "u_new_" + Date.now() });
    const { data } = await api.post<User>(endpoints.users.create, payload);
    return data;
  },

  async activity(): Promise<ActivityLog[]> {
    if (USE_MOCK) return mockResponse(activitySeed);
    const { data } = await api.get<ActivityLog[]>(endpoints.users.activity);
    return data;
  },
};
