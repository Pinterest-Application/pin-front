import type { FeedResponse } from '@models/feed';

// Used when the API has no media size for a pin (portrait 2:3).
const FALLBACK_ASPECT_RATIO = 3 / 2;

/** Height ÷ width of a pin's media. */
export function getPinAspectRatio(pin: Pick<FeedResponse, 'mediaWidth' | 'mediaHeight'>): number {
  if (!pin.mediaWidth || !pin.mediaHeight) return FALLBACK_ASPECT_RATIO;

  return pin.mediaHeight / pin.mediaWidth;
}
