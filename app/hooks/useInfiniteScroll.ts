import { type RefObject, useEffect, useState } from 'react';

interface UseInfiniteScrollOptions {
  /** The scrollable element the sentinel lives in. */
  rootRef: RefObject<HTMLElement | null>;
  /** Whether a load may start now (more pages, nothing in flight, no error). */
  enabled: boolean;
  onLoadMore: () => void;
  /**
   * How far below the visible area to start loading, as an IntersectionObserver
   * margin. Percentages are of the root's height, so the default — one screen
   * ahead — scales with the device instead of being a fixed distance.
   */
  rootMargin?: string;
}

/**
 * Calls `onLoadMore` when the sentinel comes within `rootMargin` of the root.
 * Returns a callback ref for the sentinel element.
 */
export function useInfiniteScroll({
  rootRef,
  enabled,
  onLoadMore,
  rootMargin = '0px 0px 100% 0px',
}: UseInfiniteScrollOptions) {
  // State, not a ref object: the sentinel can mount after this hook's effect has
  // run (e.g. once the grid has measured its columns), and the effect has to
  // re-run when it does.
  const [sentinel, setSentinel] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!sentinel || !enabled) return;

    // A fresh observer is created each time loading becomes possible again
    // (after a page lands). IntersectionObserver reports the current state on
    // observe(), so if the sentinel is still within the margin the next page is
    // requested right away — that's what keeps a short viewport filling up.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        observer.disconnect();
        onLoadMore();
      },
      // root must be the actual scrollable container, not the default (the
      // document viewport) — otherwise rootMargin expands the wrong box and
      // never reaches the sentinel, since the container's own overflow still
      // clips the real intersection check.
      { root: rootRef.current, rootMargin }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [sentinel, enabled, onLoadMore, rootRef, rootMargin]);

  return setSentinel;
}
