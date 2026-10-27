import type { ComponentPropsWithoutRef } from 'react';

export default function IconRefine({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      aria-label=""
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M5 23H3V10h2zm8 0h-2v-5h2zm8 0h-2V10h2zm-8-9h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2V1h2zM5 6h2a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2h2V1h2zm16 0h2a1 1 0 1 1 0 2h-6a1 1 0 0 1 0-2h2V1h2z"></path>
    </svg>
  );
}
