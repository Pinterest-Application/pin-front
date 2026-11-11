import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';

// The pin lands after the slots have risen into place.
const PIN_DROP_DELAY_S = 0.45;
// The slots start breathing once the pin has settled.
const SHIMMER_DELAY_S = 1.2;
const SHIMMER_STAGGER_S = 0.35;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.07 } },
};

const rise = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const pin = {
  hidden: { opacity: 0, y: -70 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.1, delay: PIN_DROP_DELAY_S },
      y: { type: 'spring' as const, stiffness: 320, damping: 14, delay: PIN_DROP_DELAY_S },
    },
  },
};

// Same footprint as the cards in FeedError, so the two states read as a pair.
const SLOTS = [
  { className: 'top-6 left-0 h-28' },
  { className: 'top-0 left-21.5 h-36' },
  { className: 'top-10 right-0 h-24' },
];

/**
 * Shown when the feed has no pins at all. Positioned over the scroll container
 * (which must be `relative`), like FeedError.
 */
export default function FeedEmpty() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-x-0 top-0 flex min-h-full flex-col items-center justify-center px-4 py-10 text-center"
      >
        <div
          aria-hidden
          className="relative h-44 w-60"
        >
          {SLOTS.map((slot, index) => (
            <motion.div
              key={index}
              variants={rise}
              className={`absolute w-17 ${slot.className}`}
            >
              {/* Separate layer so the endless shimmer doesn't fight the entrance above. */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { opacity: [1, 0.45, 1] }}
                transition={{
                  duration: 2.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: SHIMMER_DELAY_S + index * SHIMMER_STAGGER_S,
                }}
                className="h-full w-full rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50"
              />
            </motion.div>
          ))}

          <motion.span
            variants={pin}
            className="bg-red absolute top-2 left-28.5 z-10 h-3 w-3 rounded-full shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.25)]"
          />
        </div>

        <motion.h2
          variants={rise}
          className="mt-8 text-xl font-semibold"
        >
          Your feed is waiting for its first pins
        </motion.h2>
        <motion.p
          variants={rise}
          className="mt-2 max-w-sm text-sm text-neutral-500"
        >
          There's nothing to discover yet. Add a pin of your own to get things started.
        </motion.p>
        <motion.div
          variants={rise}
          className="mt-6"
        >
          <Link
            to="/app/create"
            className="bg-red inline-block cursor-pointer rounded-2xl px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#cc001f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#435ee5] active:scale-95"
          >
            Create a pin
          </Link>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
