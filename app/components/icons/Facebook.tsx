import type { ComponentPropsWithoutRef } from 'react';

export default function IconFacebook({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      display="block"
      fill="none"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M56 28C56 12.536 43.464 0 28 0S0 12.536 0 28c0 13.975 10.24 25.56 23.625 27.66V36.094h-7.11V28h7.11v-6.169c0-7.017 4.18-10.893 10.576-10.893 3.064 0 6.268.546 6.268.546v6.891h-3.53c-3.479 0-4.564 2.159-4.564 4.373V28h7.766l-1.242 8.094h-6.524V55.66C45.761 53.56 56 41.975 56 28Z"
        fill="#1877F2"
      ></path>
      <path
        d="M38.9 36.094 40.14 28h-7.765v-5.252c0-2.215 1.085-4.373 4.563-4.373h3.53v-6.89s-3.203-.547-6.267-.547c-6.396 0-10.576 3.876-10.576 10.893V28h-7.11v8.094h7.11V55.66a28.206 28.206 0 0 0 8.75 0V36.094h6.524Z"
        fill="#fff"
      ></path>
    </svg>
  );
}
