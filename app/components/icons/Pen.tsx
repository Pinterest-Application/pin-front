import type { ComponentPropsWithoutRef } from 'react';

export default function IconPen({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      aria-label=""
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M15.3 1.3a4 4 0 0 1 5.53.11l1.76 1.76a4 4 0 0 1 .11 5.53L9.95 21.48a2 2 0 0 1-1.12.57L2.41 23a1 1 0 0 1-.86-.28l-.25-.25a1 1 0 0 1-.28-.86l.95-6.42a2 2 0 0 1 .57-1.12L15.17 1.4l.02-.02zM3.93 15.46l-.57 4.03a1 1 0 0 0 1.13 1.13l4.03-.57L18.58 10 14 5.4zM18.57 2.32a2 2 0 0 0-1.98.5l-.47.47a1 1 0 0 0 0 1.42l3.17 3.17a1 1 0 0 0 1.4.01l.48-.48a2 2 0 0 0 0-2.82l-1.76-1.76a2 2 0 0 0-.84-.5"></path>
    </svg>
  );
}
