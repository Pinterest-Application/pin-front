import { Button, DialogTrigger } from 'react-aria-components';

import { Popover } from '@ui/Popover';

import IconDots from '@icons/Dots';

export default function NotificationCard() {
  return (
    <div className="group grid cursor-pointer grid-cols-[56px_1fr_24px] rounded-2xl p-2 hover:bg-[rgb(235,235,235)]">
      <div className="aspect-[1/1.3] w-14 rounded-lg bg-neutral-400"></div>
      <div className="flex items-center p-2">
        <div className="font-bold">blue wallpaper</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="text-xs text-[#62625b]">2w</div>

        <DialogTrigger>
          <Button className="group/btn cursor-pointer rounded-lg p-1.5 group-hover:bg-white data-hovered:bg-black">
            <IconDots className="h-3 w-3 group-data-hovered/btn:fill-white" />
          </Button>
          <Popover className="flex w-60 flex-col items-start p-2">
            <Button className="w-full cursor-pointer rounded-lg p-2 text-start font-medium data-hovered:bg-[rgb(245,245,245)]">
              See less about ...
            </Button>
            <Button className="w-full cursor-pointer rounded-lg p-2 text-start font-medium data-hovered:bg-[rgb(245,245,245)]">
              Delete update
            </Button>
            <Button className="w-full cursor-pointer rounded-lg p-2 text-start font-medium data-hovered:bg-[rgb(245,245,245)]">
              View notification settings
            </Button>
          </Popover>
        </DialogTrigger>
      </div>
    </div>
  );
}
