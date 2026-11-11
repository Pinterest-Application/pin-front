import { type ReactNode, useCallback, useMemo, useRef } from 'react';

import PinCard from '@ui/pin/PinCard';

import { useGridColumns } from '@hooks/useGridColumns';

import { getPinAspectRatio } from '@libs/pinAspectRatio';
import { splitIntoColumns } from '@libs/splitIntoColumns';

import type { FeedResponse } from '@models/feed';

// Height of PinCard's footer row under the image (its `h-6`). Keep in sync, or
// the column-height estimates drift and columns end unevenly again.
const PIN_CARD_FOOTER_HEIGHT = 24;

interface PinMasonryGridProps {
  items: FeedResponse[];
  minFrameWidth: number;
  gap: number;
  /**
   * Rendered below the grid, only once it has measured its columns — so an
   * infinite-scroll sentinel here can't see an empty grid and load a page early.
   */
  footer?: ReactNode;
}

export default function PinMasonryGrid({ items, minFrameWidth, gap, footer }: PinMasonryGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { gridCols, gridWidth } = useGridColumns(ref, minFrameWidth, gap);
  const columnWidth = gridCols && gridWidth ? (gridWidth - gap * (gridCols - 1)) / gridCols : 0;

  // Every card's rendered height is known up front from its aspect ratio — used
  // both to pick the shortest column and as the size of off-screen cards.
  const getCardHeight = useCallback(
    (pin: FeedResponse) => columnWidth * getPinAspectRatio(pin) + PIN_CARD_FOOTER_HEIGHT,
    [columnWidth]
  );

  const columns = useMemo(
    () => (gridCols ? splitIntoColumns(items, gridCols, (pin) => getCardHeight(pin) + gap) : []),
    [items, gridCols, getCardHeight, gap]
  );

  return (
    // Outer div tracks the space available; clip hides the grid's overflow
    // while it waits out a shrink at its old, wider width.
    <div
      ref={ref}
      className="overflow-x-clip"
    >
      <div
        // Fixed px width (not 100%) so the cards keep their layout during a resize.
        style={
          gridCols
            ? { width: gridWidth ?? undefined, gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, gap }
            : undefined
        }
        className="grid"
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col"
            style={{ gap }}
          >
            {column.map((pin) => (
              <div
                key={pin.id}
                // The browser skips layout and paint for cards far off screen.
                // Their size is exact, so the scrollbar and positions don't shift
                // when a card is skipped or comes back.
                style={{
                  contentVisibility: 'auto',
                  containIntrinsicSize: `auto ${columnWidth}px auto ${getCardHeight(pin)}px`,
                }}
              >
                <PinCard pin={pin} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {gridCols && footer}
    </div>
  );
}
