import React from 'react';
import { Tooltip as AriaTooltip, type TooltipProps as AriaTooltipProps } from 'react-aria-components/Tooltip';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { tv } from 'tailwind-variants';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  children: React.ReactNode;
}

const styles = tv({
  base: 'group box-border rounded-lg bg-black px-2 py-1.5 text-xs text-white will-change-transform',
});

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={8}
      className={composeRenderProps(props.className, (className, renderProps) => styles({ ...renderProps, className }))}
    >
      {children}
    </AriaTooltip>
  );
}
