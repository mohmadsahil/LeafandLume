export const endpoints = {
  contact: '/contact',
  newsletter: '/newsletter/subscribe',
} as const;

export type EndpointKey = keyof typeof endpoints;
