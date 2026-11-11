import { Button, DialogTrigger } from 'react-aria-components';

import { Popover } from '@ui/Popover';

import IconDots from '@icons/Dots';

export default function PinDraft() {
  return (
    <div className="grid cursor-pointer grid-cols-[64px_1fr_32px] rounded-xl p-2 hover:bg-[rgb(240,240,240)]">
      <div className="aspect-square w-16 rounded-xl bg-neutral-400"></div>
      <div className="flex items-center px-3">
        <div className="text-sm">27 days until expiration</div>
      </div>
      <div className="flex items-center justify-end">
        <DialogTrigger>
          <Button className="cursor-pointer rounded px-2 py-1 transition hover:bg-[rgb(230,230,230)] data-pressed:scale-90">
            <IconDots className="h-4 w-4" />
          </Button>
          <Popover
            placement="bottom end"
            className="flex w-40 flex-col items-start p-2"
          >
            <Button className="w-full cursor-pointer rounded-lg p-2 text-start font-medium data-hovered:bg-[rgb(245,245,245)]">
              Duplicate
            </Button>
            <Button className="w-full cursor-pointer rounded-lg p-2 text-start font-medium data-hovered:bg-[rgb(245,245,245)]">
              Delete
            </Button>
          </Popover>
        </DialogTrigger>
      </div>
    </div>
  );
}
