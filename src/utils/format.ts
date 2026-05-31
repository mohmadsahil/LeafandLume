/**
 * Format a number as compact currency (e.g., 1.2K, 3.4M).
 */
export function formatCompactNumber(value: number, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format a Date or date-string with a locale-aware long form.
 */
export function formatDate(input: Date | string | number, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(input));
}

/**
 * Truncate a string with an ellipsis.
 */
export function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max).trimEnd()}…` : value;
}

/**
 * Generate a URL-friendly slug from arbitrary text.
 */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
