import type { DiscoveryFeedPage, DiscoveryFeedParams } from '@models/feed';

import { apiClient, toApiError } from './client';

export async function getDiscoveryFeed(
  params: DiscoveryFeedParams = {},
  signal?: AbortSignal
): Promise<DiscoveryFeedPage> {
  try {
    const response = await apiClient.get<DiscoveryFeedPage>('/feed/discovery', { params, signal });

    return response.data;
  } catch (error) {
    throw toApiError(error, 'Failed to load the feed.');
  }
}
