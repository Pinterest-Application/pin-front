import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { Button } from 'react-aria-components';

// The loose card rotates around its one remaining pin, not its centre.
const PIN_ORIGIN = '14px 14px';
const HANGING_ANGLE_DEG = 12;
const SWAY_ANGLE_DEG = 2.5;
// The sway starts once the drop spring has mostly settled.
const SWAY_DELAY_S = 1.4;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.07 } },
  // Slight delay so the loose card visibly snaps straight before the fade.
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const looseCard = {
  hidden: { opacity: 0, rotate: 0 },
  show: {
    opacity: 1,
    rotate: HANGING_ANGLE_DEG,
    transition: {
      opacity: { duration: 0.2 },
      // Low damping: the card drops and swings a few times before it settles.
      rotate: { type: 'spring' as const, stiffness: 90, damping: 5, delay: 0.3 },
    },
  },
  // A fixed-length tween, not a spring: the skeleton waits for the whole exit
  // to finish, and a spring's long invisible tail would hold it back.
  exit: { rotate: 0, transition: { duration: 0.18, ease: 'easeOut' as const } },
};

const fallenPin = {
  hidden: { opacity: 0, y: -120 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.1, delay: 0.3 },
      y: { type: 'spring' as const, stiffness: 300, damping: 12, delay: 0.3 },
    },
  },
};

interface FeedErrorProps {
  message: string;
  onRetry: () => void;
}

/**
 * Full-page error for a feed that failed to load. Positioned over the scroll
 * container (which must be `relative`) so it stays centred and out of the
 * layout while its exit animation plays under AnimatePresence.
 */
export default function FeedError({ message, onRetry }: FeedErrorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        role="alert"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-x-0 top-0 flex min-h-full flex-col items-center justify-center px-4 py-10 text-center"
      >
        <div
          aria-hidden
          className="relative h-44 w-60"
        >
          <motion.div
            variants={rise}
            className="absolute top-6 left-0 h-28 w-17 rounded-2xl bg-neutral-200"
          />
          <motion.div
            variants={rise}
            className="absolute top-10 right-0 h-24 w-17 rounded-2xl bg-neutral-200"
          />

          <motion.div
            variants={looseCard}
            style={{ transformOrigin: PIN_ORIGIN }}
            className="absolute top-0 left-21.5 z-10 h-36 w-17"
          >
            {/* Separate layer so the endless sway adds to the hanging angle
                without fighting the drop and straighten animations above. */}
            <motion.div
              animate={
                shouldReduceMotion ? undefined : { rotate: [0, SWAY_ANGLE_DEG, 0, -SWAY_ANGLE_DEG, 0] }
              }
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: SWAY_DELAY_S }}
              style={{ transformOrigin: PIN_ORIGIN }}
              className="h-full w-full rounded-2xl bg-neutral-300 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
            >
              <span className="bg-red absolute top-2 left-2 h-3 w-3 rounded-full shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.25)]" />
              {/* The hole left by the pin that fell out. */}
              <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-neutral-400" />
            </motion.div>
          </motion.div>

          <motion.span
            variants={fallenPin}
            className="bg-red absolute bottom-0 left-38 h-3 w-3 rounded-full shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.25)]"
          />
        </div>

        <motion.h2
          variants={rise}
          className="mt-8 text-xl font-semibold"
        >
          Looks like a pin came loose
        </motion.h2>
        <motion.p
          variants={rise}
          className="mt-2 max-w-sm text-sm text-neutral-500"
        >
          {message}
        </motion.p>
        <motion.div
          variants={rise}
          className="mt-6"
        >
          <Button
            onPress={onRetry}
            className="cursor-pointer rounded-2xl bg-[rgb(239,239,235)] px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#435ee5] data-hovered:bg-[rgb(225,225,219)] data-pressed:scale-95"
          >
            Try again
          </Button>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
