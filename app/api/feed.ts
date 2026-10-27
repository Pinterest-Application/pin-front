import type { FeedResponse } from '@models/feed';

import { apiClient } from './client';

export async function getDiscoveryFeed(page: number = 1, size: number = 20): Promise<FeedResponse> {
  const response = await apiClient.get<FeedResponse>('/feed/discovery', {
    params: { page, size },
  });

  return response.data;
}
