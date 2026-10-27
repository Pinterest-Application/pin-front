import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-aria-components';

import IconArrowDown from '@icons/ArrowDown';

import { cn } from '@libs/cn';

import PinDraft from './PinDraft';

const EXPAND_TRANSITION_DURATION_S = 0.25;

const LIST_ENTRANCE_DELAY_S = 0.25;

const EXPANDED_HEIGHT_VIEWPORT_OFFSET_PX = 180;

export default function PinDrafts() {
  const [isOpen, setIsOpen] = useState(false);

  const isFirstRenderRef = useRef(true);
  const panelRef = useRef<HTMLDivElement>(null);

  const pinDraft = {
    hidden: {
      opacity: 0,
      x: -12,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  };

  const list = {
    hidden: {
      opacity: 0,
      overflowY: 'hidden' as const,
      transition: {
        opacity: { duration: 0.15 },
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    show: {
      opacity: 1,
      overflowY: 'auto' as const,
      transition: {
        opacity: { duration: 0.15 },
        staggerChildren: 0.03,
        delayChildren: LIST_ENTRANCE_DELAY_S,
      },
    },
  };

  const container = {
    hidden: {
      height: '86px',
      width: '132px',
      transition: {
        duration: EXPAND_TRANSITION_DURATION_S,
      },
    },
    show: {
      height: `calc(100vh - ${EXPANDED_HEIGHT_VIEWPORT_OFFSET_PX}px)`,
      width: '400px',
      transition: {
        duration: EXPAND_TRANSITION_DURATION_S,
      },
    },
  };

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      if (panelRef.current?.contains(target)) {
        return;
      }

      if (target instanceof Element && target.closest('[data-overlay-root]')) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  return (
    <motion.div
      ref={panelRef}
      variants={container}
      animate={isOpen ? 'show' : 'hidden'}
      onClick={() => {
        if (!isOpen) {
          setIsOpen(true);
        }
      }}
      className={cn({
        'flex h-21.5 cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#91918c] bg-white hover:bg-[rgb(249,249,249)]': true,
        'cursor-default border-[rgb(195,195,190)] bg-[rgb(249,249,249)]': isOpen,
      })}
    >
      <Button
        onPress={() => {
          if (isOpen) {
            setIsOpen(false);
          }
        }}
        className={cn({
          'flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[#435ee5]': true,
          'hover:bg-[rgb(245,245,245)]': isOpen,
          'pointer-events-none': !isOpen,
        })}
      >
        <div className="text-base font-medium">Pin drafts</div>
        <IconArrowDown
          className={cn({
            'h-3 w-3': true,
            'rotate-180': isOpen,
          })}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={list}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex h-full flex-col overflow-x-hidden px-4"
          >
            <motion.div variants={pinDraft}>
              <PinDraft title="Rome" />
            </motion.div>
            <motion.div variants={pinDraft}>
              <PinDraft title="Baku" />
            </motion.div>
            <motion.div variants={pinDraft}>
              <PinDraft title="BMW" />
            </motion.div>
            <motion.div variants={pinDraft}>
              <PinDraft title="BMW" />
            </motion.div>
            <motion.div variants={pinDraft}>
              <PinDraft title="BMW" />
            </motion.div>
            <motion.div variants={pinDraft}>
              <PinDraft title="BMW" />
            </motion.div>
            <motion.div variants={pinDraft}>
              <PinDraft title="BMW" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: isFirstRenderRef.current === true ? 1 : 0 }}
            animate={{ opacity: 1, transition: { delay: 0.25 } }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeIn', duration: 0.2 }}
            className={cn({
              'absolute bottom-3 left-0 mx-4 flex h-6 min-h-6 w-24': true,
            })}
          >
            <div className="absolute top-0 left-0 z-0 aspect-square w-6 rounded-full bg-neutral-200"></div>
            <div className="absolute top-0 left-4 z-1 aspect-square w-6 rounded-full bg-neutral-400"></div>
            <div className="absolute top-0 left-8 z-2 aspect-square w-6 rounded-full bg-neutral-600"></div>
            <div className="absolute top-0 left-12 z-3 flex aspect-square w-6 items-center justify-center rounded-full bg-neutral-800 text-xs text-white">
              +4
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
