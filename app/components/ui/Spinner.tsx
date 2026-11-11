import { cn } from '@libs/cn';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn('animate-spin rounded-full border-2 border-[#e5e5e0] border-t-[#767676]', className)}
    />
  );
}
