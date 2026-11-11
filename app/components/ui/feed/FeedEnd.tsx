import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { type RefObject, useEffect, useState } from 'react';
import { Button } from 'react-aria-components';

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const badge = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 14, delay: 0.15 } },
};

interface FeedEndProps {
  /** The feed's scroll container. */
  rootRef: RefObject<HTMLElement | null>;
  onRefresh: () => void;
}

const BUTTON_CLASS_NAME =
  'cursor-pointer rounded-2xl bg-[rgb(239,239,235)] px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#435ee5] data-hovered:bg-[rgb(225,225,219)] data-pressed:scale-95';

/**
 * Footer for a feed with no more pages. Renders nothing while the whole feed
 * fits on screen: with nothing to scroll past, "caught up" is just clutter.
 */
export default function FeedEnd({ rootRef, onRefresh }: FeedEndProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Latches on: this footer adds height of its own, so re-checking after it
    // appears could flip it off and on again at the boundary.
    const check = () => {
      if (root.scrollHeight > root.clientHeight) setIsScrollable(true);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(root);

    return () => observer.disconnect();
  }, [rootRef]);

  if (!isScrollable) return null;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ root: rootRef, once: true, amount: 0.4 }}
        className="flex flex-col items-center pt-10 pb-2 text-center"
      >
        <div
          aria-hidden
          className="flex w-full max-w-xs items-center gap-3"
        >
          <span className="h-px flex-1 bg-neutral-200" />
          <motion.span
            variants={badge}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          </motion.span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <p className="mt-3 text-sm font-semibold">You're all caught up</p>
        <p className="mt-1 text-sm text-neutral-500">You've seen every pin for now.</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Button
            onPress={() => rootRef.current?.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
            className={BUTTON_CLASS_NAME}
          >
            Back to top
          </Button>
          <Button
            onPress={onRefresh}
            className={BUTTON_CLASS_NAME}
          >
            Refresh feed
          </Button>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
