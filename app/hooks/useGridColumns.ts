import { type RefObject, useEffect, useState } from 'react';

export const MIN_GRID_COLS = 2;
export const MAX_GRID_COLS = 6;
// Matches the sidebar's width transition, so the grid updates once it ends.
const RESIZE_DELAY = 200;

/**
 * Measures the width available in `ref` and the number of columns that fit.
 * Both are `null` until the first measurement (always on the server).
 *
 * The first measurement applies right away; later ones wait until resizing has
 * been quiet for RESIZE_DELAY ms. Callers should give the grid this width
 * explicitly, so it keeps its old layout instead of reflowing every card on
 * every frame of a resize or sidebar animation.
 */
export function useGridColumns(ref: RefObject<HTMLElement | null>, minFrameWidth: number, gap: number) {
  const [gridWidth, setGridWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isMeasured = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;

      if (!isMeasured) {
        isMeasured = true;
        setGridWidth(width);
        return;
      }

      clearTimeout(timer);
      timer = setTimeout(() => setGridWidth(width), RESIZE_DELAY);
    });

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ref]);

  const gridCols =
    gridWidth === null
      ? null
      : Math.min(MAX_GRID_COLS, Math.max(MIN_GRID_COLS, Math.floor((gridWidth + gap) / (minFrameWidth + gap))));

  return { gridCols, gridWidth };
}
