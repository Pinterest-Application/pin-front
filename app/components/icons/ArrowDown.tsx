import type { ComponentPropsWithoutRef } from 'react';

export default function IconArrowDown({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      aria-label=""
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M23.7 8.7 12 20.42.3 8.71l1.4-1.42L12 17.6 22.3 7.3z"></path>
    </svg>
  );
}
