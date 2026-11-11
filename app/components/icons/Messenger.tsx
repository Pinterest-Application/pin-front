import type { ComponentPropsWithoutRef } from 'react';

export default function IconMessenger({ ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      display="block"
      fill="none"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        fill="#fff"
        height="56"
        rx="28"
        width="56"
      ></rect>
      <rect
        height="55"
        rx="27.5"
        stroke="#767676"
        strokeOpacity=".4"
        width="55"
        x=".5"
        y=".5"
      ></rect>
      <path
        d="M28 12c-9.012 0-16 6.604-16 15.52 0 4.664 1.912 8.696 5.024 11.48.26.232.42.56.428.912l.088 2.848c.028.908.964 1.5 1.796 1.132l3.176-1.4c.268-.12.572-.14.856-.064 1.46.4 3.012.616 4.632.616 9.012 0 16-6.604 16-15.52S37.012 12 28 12Z"
        fill="url(#paint0_radial_3730_649_messenger)"
      ></path>
      <path
        d="m18.392 32.06 4.7-7.456a2.401 2.401 0 0 1 3.472-.64l3.74 2.804a.96.96 0 0 0 1.156-.004l5.048-3.832c.672-.512 1.552.296 1.104 1.012l-4.704 7.452a2.401 2.401 0 0 1-3.472.64l-3.74-2.804a.96.96 0 0 0-1.156.004l-5.048 3.832c-.672.512-1.552-.292-1.1-1.008Z"
        fill="#fff"
      ></path>
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(18.16 43.826) scale(34.8672)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_3730_649_messenger"
          r="1"
        >
          <stop stopColor="#09F"></stop>
          <stop
            offset=".61"
            stopColor="#A033FF"
          ></stop>
          <stop
            offset=".935"
            stopColor="#FF5280"
          ></stop>
          <stop
            offset="1"
            stopColor="#FF7061"
          ></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}
