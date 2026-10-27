import type { ComponentPropsWithoutRef } from 'react';

export default function IconX({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m12 13.41 8.3 8.3 1.4-1.42L13.42 12l8.3-8.3-1.42-1.4-8.3 8.28-8.3-8.3L2.3 3.7l8.28 8.3-8.3 8.3 1.42 1.4z"></path>
    </svg>
  );
}
