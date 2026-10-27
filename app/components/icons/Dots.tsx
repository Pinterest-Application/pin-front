import type { ComponentPropsWithoutRef } from 'react';

export default function IconDots({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      aria-label=""
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M2.5 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m9.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m9.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5"></path>
    </svg>
  );
}
