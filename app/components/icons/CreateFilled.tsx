import type { ComponentPropsWithoutRef } from 'react';

export default function IconCreateFilled({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      aria-label=""
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M1 5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4zm10 6H6v2h5v5h2v-5h5v-2h-5V6h-2z"></path>
    </svg>
  );
}
