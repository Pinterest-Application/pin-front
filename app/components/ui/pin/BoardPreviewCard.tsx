import IconVerified from '@icons/Verified';

interface BoardPreviewCardProps {}

export default function BoardPreviewCard({}: BoardPreviewCardProps) {
  return (
    <div>
      <div className="mb-2 grid aspect-3/2 grid-cols-3 grid-rows-2 gap-px overflow-hidden rounded-2xl">
        <div className="col-span-2 row-span-2 bg-neutral-500"></div>
        <div className="col-span-1 row-span-1 bg-neutral-500"></div>
        <div className="col-span-1 row-span-1 bg-neutral-500"></div>
      </div>
      <div className="px-2">
        <div className="mb-1 text-sm font-bold md:text-base">Trending halloween costumes</div>
        <div className="mb-1 flex items-center gap-1 text-xs">
          <span>Fashion</span>
          <IconVerified className="fill-red h-3 w-3" />
        </div>
        <div className="text-xs text-[#62625b]">
          <span>64 Pins</span>
          <span className="px-1">·</span>
          <span>2w</span>
        </div>
      </div>
    </div>
  );
}
