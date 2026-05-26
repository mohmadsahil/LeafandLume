import axios, { type AxiosInstance } from 'axios';
import { env } from '@/lib/env';

/**
 * Shared HTTP client with interceptors. Use this in services, server actions,
 * or React Query queryFns. Authentication tokens can be attached via the
 * request interceptor below once your auth flow is in place.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  // Attach auth header here once available, e.g.:
  // const token = getAccessToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error normalization — surface to UI via toast / boundary.
    return Promise.reject(error);
  },
);
