import type { ComponentPropsWithoutRef } from 'react';

export default function IconRightArrow({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      aria-label=""
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m14.7 3.3 8.71 8.7-8.7 8.7-1.42-1.4 6.3-6.3H0v-2h19.59l-6.3-6.3z"></path>
    </svg>
  );
}
