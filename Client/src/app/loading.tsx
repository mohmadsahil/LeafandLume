/**
 * Route-level loading UI. Renders a slim animated progress bar pinned to
 * the top of the viewport so navigation feels instant instead of replacing
 * the entire main area with a spinner.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] overflow-hidden bg-primary/10"
    >
      <div className="h-full w-2/5 animate-loading-bar rounded-full bg-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
