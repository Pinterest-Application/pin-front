import type { ComponentPropsWithoutRef } from 'react';

export default function IconSearch({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-label="Search icon"
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M17.33 18.74a10 10 0 1 1 1.41-1.41l4.47 4.47-1.41 1.41zM11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16"></path>
    </svg>
  );
}
