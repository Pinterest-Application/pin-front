import type { ComponentPropsWithoutRef } from 'react';

export default function IconXSocialMedia({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      display="block"
      fill="none"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        fill="#111111"
        height="56"
        rx="28"
        width="56"
      ></rect>
      <path
        d="M30.3055 25.8561L40.505 14H38.088L29.2318 24.2945L22.1584 14H14L24.6964 29.5671L14 42H16.4171L25.7695 31.1287L33.2396 42H41.3979L30.3049 25.8561H30.3055ZM26.995 29.7042L25.9112 28.1541L17.288 15.8196H21.0005L27.9595 25.7739L29.0433 27.324L38.0892 40.2632H34.3767L26.995 29.7048V29.7042Z"
        fill="white"
      ></path>
    </svg>
  );
}
