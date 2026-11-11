import { memo } from 'react';
import { Button, DialogTrigger, Input, Label, TooltipTrigger } from 'react-aria-components';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { useCopyToClipboard } from 'react-use';

import { Popover } from '@ui/Popover';
import { Tooltip } from '@ui/Tooltip';

import IconDots from '@icons/Dots';
import IconDownload from '@icons/Download';
import IconExport from '@icons/Export';
import IconEyeClosed from '@icons/EyeClosed';
import IconFacebook from '@icons/Facebook';
import IconFlag from '@icons/Flag';
import IconHeart from '@icons/Heart';
import IconLink from '@icons/Link';
import IconMessenger from '@icons/Messenger';
import IconSearch from '@icons/Search';
import IconWhatsApp from '@icons/WhatsApp';
import IconXSocialMedia from '@icons/XSocialMedia';

import { getPinAspectRatio } from '@libs/pinAspectRatio';

import type { FeedResponse } from '@models/feed';

interface PinCardProps {
  pin: FeedResponse;
}

function PinCard({ pin }: PinCardProps) {
  const showExport = pin.mediaHeight / pin.mediaWidth > 0.6;
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyLinkToClipboard = () => {
    copyToClipboard(import.meta.env.VITE_SITE_URL + '/app/pin/' + pin.pinId);
    toast.success('Copied');
  };

  return (
    <div className="flex h-fit flex-col">
      <Link
        to={`/app/pin/${pin.pinId}`}
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl"
      >
        <img
          src={pin.mediaUrl}
          alt=""
          loading="lazy"
          decoding="async"
          width={pin.mediaWidth ?? undefined}
          height={pin.mediaHeight ?? undefined}
          // Same ratio PinMasonryGrid assumes when picking the shortest column,
          // including the fallback for pins without a stored size.
          style={{ aspectRatio: `1 / ${getPinAspectRatio(pin)}` }}
          className="h-full w-full bg-neutral-300 object-cover"
        />
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-end justify-between p-3 opacity-0 group-hover:bg-black/20 group-hover:opacity-100">
          <Button className="bg-red h-12 cursor-pointer rounded-2xl px-4 py-2 text-base font-medium text-white transition duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]">
            Save
          </Button>

          {showExport && (
            <DialogTrigger>
              <Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white transition data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-90">
                <IconExport className="h-4 w-4" />
              </Button>
              <Popover
                placement="left"
                className="w-[385px] max-w-[385px]"
              >
                <div className="flex h-[50px] items-center justify-center text-sm font-bold">Share</div>
                <div className="mb-4 grid grid-cols-5 border-b border-[rgb(200,200,193)] pb-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      onPress={copyLinkToClipboard}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-[rgb(229,229,224)] transition data-hovered:bg-[rgb(218,218,211)] data-pressed:scale-90"
                    >
                      <IconLink className="h-6 w-6" />
                    </Button>
                    <div className="text-xs">Copy link</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Button className="cursor-pointer">
                      <IconWhatsApp className="h-12 w-12" />
                    </Button>
                    <div className="text-xs">WhatsApp</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Button className="cursor-pointer">
                      <IconMessenger className="h-12 w-12" />
                    </Button>
                    <div className="text-xs">Messenger</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Button className="cursor-pointer">
                      <IconFacebook className="h-12 w-12" />
                    </Button>
                    <div className="text-xs">Facebook</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Button className="cursor-pointer">
                      <IconXSocialMedia className="h-12 w-12" />
                    </Button>
                    <div className="text-xs">X</div>
                  </div>
                </div>

                <div className="h-50">
                  <Label className="flex w-full items-center gap-2 rounded-2xl border border-[rgb(145,145,140)] bg-white p-3 ps-4">
                    <IconSearch className="h-4 w-4" />
                    <Input
                      className="w-full focus:outline-none"
                      placeholder="Search people"
                    />
                  </Label>
                </div>
              </Popover>
            </DialogTrigger>
          )}
        </div>
      </Link>

      <div className="flex h-6 min-h-6 items-center justify-between gap-2 px-1.5 pt-2 pb-0">
        <div className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap"></div>
        <DialogTrigger>
          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <Button className="flex aspect-square w-6 min-w-6 cursor-pointer items-center justify-center rounded-lg data-hovered:bg-[rgba(246,246,243,0.6)]">
              <IconDots className="h-3 w-3" />
            </Button>
            <Tooltip placement="bottom">More actions</Tooltip>
          </TooltipTrigger>

          <Popover className="flex w-71 max-w-71 flex-col p-3">
            <div className="p-2 text-sm">This Pin was inspired by your recent activity</div>
            <Button className="flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]">
              <IconHeart className="h-5 w-5" />
              <div>See more</div>
            </Button>
            <Button className="flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]">
              <IconEyeClosed className="h-5 w-5" />
              <div>See less</div>
            </Button>
            <Button className="flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]">
              <IconDownload className="h-5 w-5" />
              <div>Download image</div>
            </Button>
            <Button className="flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]">
              <IconFlag className="h-5 w-5" />
              <div>Report Pin</div>
            </Button>
          </Popover>
        </DialogTrigger>
      </div>
    </div>
  );
}

export default memo(PinCard);
