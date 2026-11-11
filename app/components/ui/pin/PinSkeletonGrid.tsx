import { MAX_GRID_COLS } from '@hooks/useGridColumns';

import PinSkeletonCard from './PinSkeletonCard';

// 30 cards: CSS columns balance heights, and with fewer cards the browser can
// leave the last column empty at 6 columns.
const SKELETON_HEIGHTS = [3, 4, 2, 5, 3, 4, 2, 3, 5, 4, 3, 2, 4, 3, 5, 2, 4, 3, 2, 5, 3, 5, 2, 4, 3, 2, 5, 3, 4, 2];

interface PinSkeletonGridProps {
  minFrameWidth: number;
  gap: number;
}

/**
 * Pure-CSS multi-column layout: the browser picks the column count during
 * layout, so the server HTML is already correct and nothing is measured in JS.
 * Fine for placeholders; the real feed can't use it because CSS columns fill
 * top-to-bottom and reflow every item when more are added.
 */
export default function PinSkeletonGrid({ minFrameWidth, gap }: PinSkeletonGridProps) {
  return (
    // `@container` lets the column width below use `cqw` (this wrapper's width).
    <div className="@container">
      <div
        style={{
          // Column width capped so at least 2 columns always fit (the hook's
          // minimum); the trailing count caps it at the hook's maximum.
          columns: `min(${minFrameWidth}px, calc(50cqw - ${gap / 2}px)) ${MAX_GRID_COLS}`,
          columnGap: gap,
        }}
      >
        {SKELETON_HEIGHTS.map((height, index) => (
          <div
            key={index}
            className="break-inside-avoid"
            // CSS columns have no row gap, so spacing comes from a margin.
            style={{ marginBottom: gap }}
          >
            <PinSkeletonCard height={height} />
          </div>
        ))}
      </div>
    </div>
  );
}
