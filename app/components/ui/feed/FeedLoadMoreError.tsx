import { MotionConfig, motion } from 'motion/react';
import { Button } from 'react-aria-components';

import Spinner from '@ui/Spinner';

import { cn } from '@libs/cn';

interface FeedLoadMoreErrorProps {
  message: string;
  onRetry: () => void;
  /** The failed page is being requested again; the error stays until it lands. */
  isRetrying: boolean;
}

/** Compact inline error for a failed next page — the loaded grid stays above it. */
export default function FeedLoadMoreError({ message, onRetry, isRetrying }: FeedLoadMoreErrorProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        role="alert"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4"
      >
        <p className="text-sm text-neutral-600">{message}</p>
        <Button
          onPress={onRetry}
          isPending={isRetrying}
          className="relative cursor-pointer rounded-2xl bg-[rgb(239,239,235)] px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#435ee5] data-hovered:bg-[rgb(225,225,219)] data-pending:cursor-default data-pressed:scale-95"
        >
          {/* The label keeps its space while pending so the button doesn't resize. */}
          <span className={cn({ invisible: isRetrying })}>Try again</span>
          {isRetrying && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Spinner size={16} />
            </span>
          )}
        </Button>
      </motion.div>
    </MotionConfig>
  );
}
