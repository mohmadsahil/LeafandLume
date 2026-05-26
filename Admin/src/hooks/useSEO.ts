import { useQuery } from "@tanstack/react-query";
import { seoService } from "@/services/seo.service";

export function useSeoOverview() {
  return useQuery({ queryKey: ["seo", "overview"], queryFn: () => seoService.overview() });
}

export function useSeoPages() {
  return useQuery({ queryKey: ["seo", "pages"], queryFn: () => seoService.pages() });
}

export function useSeoRedirects() {
  return useQuery({ queryKey: ["seo", "redirects"], queryFn: () => seoService.redirects() });
}
