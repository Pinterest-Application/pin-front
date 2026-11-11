interface PinSkeletonCardProps {
  height: number;
}

export default function PinSkeletonCard({ height }: PinSkeletonCardProps) {
  return (
    <div style={{ aspectRatio: `${2} / ${height}` }}>
      <div className="h-full w-full animate-pulse rounded-2xl bg-neutral-300" />
    </div>
  );
}
