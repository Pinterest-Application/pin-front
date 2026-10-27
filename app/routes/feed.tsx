import { useCallback, useEffect, useRef, useState } from 'react';
import { getDiscoveryFeed } from '~/api';

import PinCard from '@ui/pin/PinCard';

import type { FeedPin } from '@models/feed';

const SKELETON_ASPECT_RATIOS = [
  'aspect-[3/4]',
  'aspect-[9/16]',
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[9/16]',
  'aspect-[3/4]',
  'aspect-[2/3]',
  'aspect-[9/16]',
  'aspect-[4/5]',
  'aspect-[3/4]',
];

export default function Feed() {
  const [pins, setPins] = useState<FeedPin[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchFeed = useCallback(async (pageNum: number, isInitial = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (isInitial) {
      setIsLoading(true);
      setError(null);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const data = await getDiscoveryFeed(pageNum, 10);

      setPins((prev) => {
        if (isInitial) return data.content;
        // Avoid any duplicates by id
        const existingIds = new Set(prev.map((p) => p.id));
        const newPins = data.content.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newPins];
      });

      setPage(pageNum);
      const isLast = data.last || data.number >= data.totalPages;
      setHasMore(!isLast);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load feed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFeed(1, true);
  }, [fetchFeed]);

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isFetchingRef.current) {
          fetchFeed(page + 1);
        }
      },
      {
        root: null,
        rootMargin: '400px', // Preload before user reaches the very bottom
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchFeed, page, hasMore, isLoading, isLoadingMore]);

  return (
    <div className="app-container h-[calc(100vh-80px)] overflow-y-auto pt-4 pb-12">
      {/* Initial Loading Skeletons */}
      {isLoading && (
        <div className="columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
          {SKELETON_ASPECT_RATIOS.map((aspect, idx) => (
            <div
              key={idx}
              className={`mb-4 w-full animate-pulse break-inside-avoid rounded-2xl bg-neutral-200 ${aspect}`}
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && pins.length === 0 && (
        <div className="flex h-[50vh] flex-col items-center justify-center text-center">
          <p className="mb-4 text-base text-neutral-600">{error}</p>
          <button
            type="button"
            onClick={() => fetchFeed(1, true)}
            className="bg-red cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && pins.length === 0 && (
        <div className="flex h-[50vh] flex-col items-center justify-center text-neutral-500">
          <p className="text-lg font-medium">No pins to explore yet</p>
          <p className="mt-1 text-sm text-neutral-400">Check back later for new ideas!</p>
        </div>
      )}

      {/* Masonry Pin Grid */}
      {pins.length > 0 && (
        <>
          <div className="columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
            {pins.map((pin) => (
              <PinCard
                key={pin.id}
                pin={pin}
              />
            ))}
          </div>

          {/* Bottom sentinel for infinite scroll */}
          <div
            ref={sentinelRef}
            className="h-10 w-full"
          />

          {/* Loading more indicator */}
          {isLoadingMore && (
            <div className="flex justify-center py-6">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
            </div>
          )}

          {!hasMore && <div className="py-8 text-center text-sm text-neutral-400">You're all caught up!</div>}
        </>
      )}
    </div>
  );
}
