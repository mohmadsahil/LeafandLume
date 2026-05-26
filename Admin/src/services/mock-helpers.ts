import { delay } from "@/lib/utils";
import type { Paginated, QueryParams } from "@/types/common";

export async function mockResponse<T>(payload: T, ms = 250): Promise<T> {
  await delay(ms);
  return payload;
}

export function paginate<T>(items: T[], params: QueryParams = {}): Paginated<T> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return { data, page, pageSize, total, totalPages };
}

export function filterAndSort<T extends Record<string, any>>(
  items: T[],
  params: QueryParams = {},
  searchFields: (keyof T)[] = [],
): T[] {
  let result = [...items];
  if (params.search && searchFields.length) {
    const s = params.search.toLowerCase();
    result = result.filter((item) =>
      searchFields.some((f) =>
        String(item[f] ?? "").toLowerCase().includes(s),
      ),
    );
  }
  if (params.status) {
    result = result.filter((i) => (i as any).status === params.status);
  }
  if (params.category) {
    result = result.filter((i) => (i as any).category === params.category);
  }
  if (params.sortBy) {
    const dir = params.sortDir === "asc" ? 1 : -1;
    result.sort((a, b) => {
      const av = (a as any)[params.sortBy!];
      const bv = (b as any)[params.sortBy!];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }
  return result;
}
