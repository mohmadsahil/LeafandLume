import dashboardMock from "@/mock/dashboard.json";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type {
  ActivityEntry,
  ChartPoint,
  DashboardStats,
  TrafficSource,
} from "@/types/dashboard";
import { mockResponse } from "./mock-helpers";

const USE_MOCK = true;

export type DashboardPayload = {
  stats: DashboardStats;
  revenueSeries: ChartPoint[];
  customerGrowth: ChartPoint[];
  salesByCategory: ChartPoint[];
  trafficSources: TrafficSource[];
  activity: ActivityEntry[];
};

export const dashboardService = {
  async overview(): Promise<DashboardPayload> {
    if (USE_MOCK) return mockResponse(dashboardMock as unknown as DashboardPayload);
    const { data } = await api.get<DashboardPayload>(endpoints.dashboard.overview);
    return data;
  },
};
