import { Button, Input, Label, TextArea } from 'react-aria-components';

import PinDrafts from '@ui/create/PinDrafts';

import IconMedia from '@icons/Media';

// Height (in px) of the sticky "Create Pin" header bar above (h-18 = 72px
// plus its border) that the scrollable content area below must not overlap.
const HEADER_HEIGHT_PX = 152;

export default function CreatePin() {
  return (
    <div className="relative">
      <div className="flex h-18 w-full items-center justify-between border-y border-[#c8c8c1] px-4">
        <div className="text-xl font-bold">Create Pin</div>
        <Button className="bg-red ease h-12 cursor-pointer rounded-2xl px-4 py-2 text-base font-medium text-white transition duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]">
          Publish
        </Button>
      </div>

      <div
        className="relative overflow-auto"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT_PX}px)` }}
      >
        <div className="fixed right-8 bottom-4 z-10">
          <PinDrafts />
        </div>

        <div className="mx-auto flex w-full max-w-146 flex-col items-center gap-4 pt-4 pb-20">
          <div className="relative z-0 mb-4 aspect-[0.82/1] w-2/3 overflow-hidden rounded-4xl border border-[#c8c8c1] bg-[#e5e5e0]">
            <input
              type="file"
              className="absolute top-0 left-0 z-10 h-full w-full cursor-pointer opacity-0"
              accept="image/gif,image/jpeg,image/png,image/webp"
            />
            <div className="absolute top-0 left-0 z-1 flex h-full w-full flex-col items-center justify-center">
              <IconMedia className="h-8 w-8" />
              <div className="py-3 text-sm font-bold">Upload your media</div>
              <div className="max-w-50 text-center text-sm text-[#62625b]">
                Select multiple files in your file picker with Shift or Cmd/Ctrl
              </div>
              <div className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center text-sm text-[#62625b]">
                JPG, PNG up to 20MB, MP4 up to 200MB
              </div>
            </div>
          </div>

          <Label className="w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
            <div className="mb-2 text-xs font-medium">Title</div>
            <Input
              className="w-full outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]"
              placeholder="Tell everyone what your Pin is about"
            />
          </Label>

          <Label className="w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
            <div className="mb-2 text-xs font-medium">Description</div>
            <TextArea
              className="field-sizing-content min-h-12 w-full resize-none outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]"
              placeholder="Describe your pin"
            />
          </Label>
        </div>
      </div>
    </div>
  );
}
