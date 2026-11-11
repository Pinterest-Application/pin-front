export interface FeedResponse {
  id: string;
  pinId: string;
  mediaUrl: string;
  mediaWidth: number;
  mediaHeight: number;
  createdAt: string;
}

export interface DiscoveryFeedPage {
  items: FeedResponse[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface DiscoveryFeedParams {
  cursor?: string; // max 200 chars
  size?: number; // 1–50, defaults to 20 on the server
}
