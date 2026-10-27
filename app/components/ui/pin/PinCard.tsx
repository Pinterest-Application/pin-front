import { useState } from 'react';
import type { FeedPin } from '@models/feed';

interface PinCardProps {
  pin: FeedPin;
}

export default function PinCard({ pin }: PinCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatio =
    pin.mediaWidth && pin.mediaHeight ? `${pin.mediaWidth} / ${pin.mediaHeight}` : '3 / 4';

  return (
    <div className="group break-inside-avoid mb-4 relative cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-100 transition-shadow duration-200 hover:shadow-lg">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-neutral-200" />
        )}

        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 text-xs text-neutral-400 p-2 text-center">
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={pin.mediaUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="pointer-events-auto flex h-full flex-col justify-between p-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="cursor-pointer rounded-full bg-red px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
