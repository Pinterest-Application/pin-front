import { type RefObject, useEffect, useRef } from 'react';

// Content can still be laying out when restoring (the grid measures its columns
// first), so keep trying for up to ~half a second.
const MAX_RESTORE_FRAMES = 30;

function readPosition(key: string): number {
  try {
    return Number(sessionStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

function savePosition(key: string, top: number) {
  try {
    sessionStorage.setItem(key, String(top));
  } catch {
    // Storage unavailable (private mode, quota) — restoring just won't happen.
  }
}

/**
 * Remembers an inner scroll container's position per `storageKey` and restores
 * it once `ready`. React Router's <ScrollRestoration> only handles the window.
 * Use the history entry's `location.key` in the key so going back restores the
 * position while a fresh visit starts at the top.
 */
export function useScrollRestoration(ref: RefObject<HTMLElement | null>, storageKey: string, ready: boolean) {
  const restoredKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => savePosition(storageKey, el.scrollTop));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', handleScroll);
    };
  }, [ref, storageKey]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready || restoredKeyRef.current === storageKey) return;

    restoredKeyRef.current = storageKey;
    const target = readPosition(storageKey);
    if (!target) return;

    let frames = 0;
    let frame = 0;
    const attempt = () => {
      el.scrollTop = target;
      // scrollTop is clamped while the content is still too short; retry.
      if (Math.abs(el.scrollTop - target) > 1 && ++frames < MAX_RESTORE_FRAMES) {
        frame = requestAnimationFrame(attempt);
      }
    };
    attempt();

    return () => cancelAnimationFrame(frame);
  }, [ref, storageKey, ready]);
}
