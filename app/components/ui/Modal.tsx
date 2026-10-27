import { ModalOverlay, type ModalOverlayProps, Modal as RACModal } from 'react-aria-components/Modal';
import { tv } from 'tailwind-variants';

const modalOverlayStyles = tv({
  base: 'absolute top-0 left-0 isolate z-20 h-(--page-height) w-full bg-black/60 text-center',
  variants: {
    isEntering: {
      true: 'motion-opacity-in-0 motion-ease-spring-smooth motion-duration-200',
    },
    isExiting: {
      true: 'motion-opacity-out-0 motion-ease-spring-smooth motion-duration-200',
    },
  },
});

const modalStyles = tv({
  base: 'max-h-[calc(var(--visual-viewport-height)*0.9)] w-full max-w-[min(90vw,450px)] rounded-[20px] bg-white shadow-2xl',
  variants: {
    isEntering: {
      true: 'motion-scale-in-95 motion-ease-spring-smooth motion-duration-200',
    },
    isExiting: {
      true: 'motion-scale-out-95 motion-ease-spring-smooth motion-duration-200',
    },
  },
});

export default function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay
      {...props}
      className={modalOverlayStyles}
    >
      <div className="sticky top-0 left-0 box-border flex h-(--visual-viewport-height) w-full items-center justify-center">
        <RACModal
          {...props}
          className={modalStyles}
        />
      </div>
    </ModalOverlay>
  );
}
