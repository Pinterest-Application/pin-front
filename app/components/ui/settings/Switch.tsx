import type { ReactNode } from 'react';
import { SwitchButton, SwitchField, type SwitchFieldProps, type ValidationResult } from 'react-aria-components/Switch';
import { tv } from 'tailwind-variants';

import { cn } from '@libs/cn';

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  children: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const track = tv({
  base: 'box-border flex h-5 w-9 shrink-0 cursor-default items-center rounded-full border border-transparent px-px font-sans transition duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'group-pressed:bg-neutral-200 bg-[#91918c]',
      true: 'group-pressed:bg-neutral-800 bg-[#435ee5] forced-colors:bg-[Highlight]!',
    },
    isDisabled: {
      true: 'group-selected:bg-neutral-300 forced-colors:group-selected:bg-[GrayText]! border-neutral-300 bg-neutral-100 forced-colors:border-[GrayText]',
    },
  },
});

const handle = tv({
  base: 'h-4 w-4 transform rounded-full bg-white shadow-xs outline outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'translate-x-0',
      true: 'translate-x-[100%]',
    },
    isDisabled: {
      true: 'forced-colors:outline-[GrayText]',
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: true,
      class: 'bg-neutral-300',
    },
    {
      isSelected: true,
      isDisabled: true,
      class: 'bg-neutral-50',
    },
  ],
});

export function SwitchSettings({ children, ...props }: SwitchProps) {
  return (
    <SwitchField
      {...props}
      className="group flex flex-col gap-1"
    >
      <SwitchButton
        className={cn(
          props.className,
          'group relative flex w-full items-center justify-between rounded-lg px-2 py-4 hover:bg-[rgb(245,245,245)]'
        )}
      >
        {(renderProps) => (
          <>
            <div
              className={cn({
                'text-[#62625b]': props.isDisabled,
              })}
            >
              {children}
            </div>
            <div className={track(renderProps)}>
              <span className={handle(renderProps)} />
            </div>
          </>
        )}
      </SwitchButton>
    </SwitchField>
  );
}
