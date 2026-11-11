import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import type { FeedResponse } from '@models/feed';

import { ApiError } from '@api/client';
import { getDiscoveryFeed } from '@api/feed';

const FEED_PAGE_SIZE = 50;
// Refetching an infinite query re-requests every loaded page in sequence, and a
// discovery feed may reorder between requests — so keep loaded pages fresh for a
// while instead of refetching on every focus/remount/reconnect.
const FEED_STALE_TIME = 5 * 60 * 1000;
const FEED_MAX_RETRIES = 2;
const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';
const FEED_QUERY_KEY = ['discovery-feed', { size: FEED_PAGE_SIZE }] as const;

function shouldRetry(failureCount: number, error: Error): boolean {
  // Client errors won't fix themselves on retry (408/429 are the exceptions).
  if (error instanceof ApiError && error.status !== undefined) {
    const isClientError = error.status >= 400 && error.status < 500;
    if (isClientError && error.status !== 408 && error.status !== 429) return false;
  }

  return failureCount < FEED_MAX_RETRIES;
}

function toUserMessage(error: Error): string {
  // Server errors (5xx) can carry internal details; only show the API's own
  // message for client errors and our own fallbacks (no status).
  if (error instanceof ApiError && (error.status === undefined || error.status < 500)) return error.message;

  return GENERIC_ERROR_MESSAGE;
}

/** Feed data only; pair with useInfiniteScroll for loading on scroll. */
export function useDiscoveryFeed() {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    isPending,
    isSuccess,
    isLoadingError,
    isFetchNextPageError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: ({ pageParam, signal }) => getDiscoveryFeed({ cursor: pageParam, size: FEED_PAGE_SIZE }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.hasMore || !lastPage.nextCursor) return undefined;
      // Guard against a backend that hands back the same cursor or an empty
      // page: either would otherwise keep the sentinel in view and load forever.
      if (lastPage.nextCursor === lastPageParam || lastPage.items.length === 0) return undefined;

      return lastPage.nextCursor;
    },
    staleTime: FEED_STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: shouldRetry,
  });

  // The same pin can come back in more than one feed entry (and cursor feeds can
  // repeat entries across pages), so keep only the first entry for each pin.
  const items = useMemo<FeedResponse[]>(() => {
    if (!data) return [];

    const seen = new Set<string>();

    return data.pages
      .flatMap((page) => page.items)
      .filter((item) => {
        if (seen.has(item.pinId)) return false;
        seen.add(item.pinId);
        return true;
      });
  }, [data]);

  const hasMore = hasNextPage ?? false;

  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const retry = useCallback(() => {
    if (isFetchNextPageError) {
      fetchNextPage();
    } else {
      refetch();
    }
  }, [isFetchNextPageError, fetchNextPage, refetch]);

  // A reset, not a refetch: it drops the loaded pages and requests only the
  // first one, where a refetch would re-request every loaded page in sequence.
  const refresh = useCallback(() => {
    queryClient.resetQueries({ queryKey: FEED_QUERY_KEY, exact: true });
  }, [queryClient]);

  const errorMessage = error ? toUserMessage(error) : null;

  return {
    items,
    isLoading: isPending,
    isEmpty: isSuccess && items.length === 0 && !hasMore,
    hasMore,
    isLoadingMore: isFetchingNextPage,
    /**
     * Whether scrolling may load the next page. False after a failed page, so
     * the user resumes with `retry` — otherwise the observer would re-fire
     * immediately and retry forever.
     */
    canLoadMore: hasMore && !isFetchingNextPage && !isFetchNextPageError,
    loadMore,
    /** First page failed — nothing to show. */
    initialError: isLoadingError ? errorMessage : null,
    /** A later page failed — loaded items are still shown. */
    loadMoreError: isFetchNextPageError ? errorMessage : null,
    retry,
    /** Start over from the first page; the feed goes back to its loading state. */
    refresh,
  };
}
