import { AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router';

import Spinner from '@ui/Spinner';
import FeedEmpty from '@ui/feed/FeedEmpty';
import FeedEnd from '@ui/feed/FeedEnd';
import FeedError from '@ui/feed/FeedError';
import FeedLoadMoreError from '@ui/feed/FeedLoadMoreError';
import PinMasonryGrid from '@ui/pin/PinMasonryGrid';
import PinSkeletonGrid from '@ui/pin/PinSkeletonGrid';

import { useDiscoveryFeed } from '@hooks/useDiscoveryFeed';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useScrollRestoration } from '@hooks/useScrollRestoration';

import { cn } from '@libs/cn';

const MIN_FRAME_WIDTH = 200;
const GRID_GAP = 12;

export default function Feed() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const {
    items,
    isLoading,
    isEmpty,
    hasMore,
    isLoadingMore,
    canLoadMore,
    loadMore,
    initialError,
    loadMoreError,
    retry,
    refresh,
  } = useDiscoveryFeed();

  // Stays true until the error's exit animation has finished, so the skeleton
  // waits for the error to fade out instead of appearing underneath it.
  const [isErrorOnScreen, setIsErrorOnScreen] = useState(false);
  if (initialError && !isErrorOnScreen) setIsErrorOnScreen(true);
  // Once an error has been shown, the skeleton fades in rather than popping in.
  const [hasShownError, setHasShownError] = useState(false);
  if (initialError && !hasShownError) setHasShownError(true);

  const sentinelRef = useInfiniteScroll({ rootRef: scrollContainerRef, enabled: canLoadMore, onLoadMore: loadMore });
  // Keyed by history entry: Back restores the position, a fresh visit starts at the top.
  useScrollRestoration(scrollContainerRef, `feed-scroll:${location.key}`, items.length > 0);

  return (
    <div
      ref={scrollContainerRef}
      className={cn({
        // scrollbar-gutter reserves the scrollbar's space up front, so the grid's
        // first measurement doesn't change when content starts to scroll.
        // `relative` anchors the full-page error, which is positioned over this container.
        'app-container relative h-[calc(100vh-80px)] [scrollbar-gutter:stable] overflow-y-auto pb-12': true,
        'overflow-hidden': isLoading,
      })}
    >
      {/* Outside the branches below so that on retry it can play its exit
          animation instead of being swapped for the skeleton instantly. */}
      <AnimatePresence onExitComplete={() => setIsErrorOnScreen(false)}>
        {initialError && (
          <FeedError
            key="feed-error"
            message={initialError}
            onRetry={retry}
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        !isErrorOnScreen && (
          <div className={cn({ 'motion-opacity-in-0 motion-duration-200': hasShownError })}>
            <PinSkeletonGrid
              minFrameWidth={MIN_FRAME_WIDTH}
              gap={GRID_GAP}
            />
          </div>
        )
      ) : initialError ? null : isEmpty ? (
        <FeedEmpty />
      ) : (
        <PinMasonryGrid
          items={items}
          minFrameWidth={MIN_FRAME_WIDTH}
          gap={GRID_GAP}
          footer={
            hasMore ? (
              <div
                ref={sentinelRef}
                className="flex min-h-16 w-full items-center justify-center"
              >
                {loadMoreError ? (
                  <FeedLoadMoreError
                    message={loadMoreError}
                    onRetry={retry}
                    isRetrying={isLoadingMore}
                  />
                ) : (
                  isLoadingMore && <Spinner size={24} />
                )}
              </div>
            ) : (
              <FeedEnd
                rootRef={scrollContainerRef}
                onRefresh={() => {
                  // Jump to the top first: the skeleton replaces the grid, and
                  // it should be seen from its start, not from mid-scroll.
                  if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
                  refresh();
                }}
              />
            )
          }
        />
      )}
    </div>
  );
}
