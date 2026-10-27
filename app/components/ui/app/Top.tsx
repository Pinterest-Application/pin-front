import { useState } from 'react';
import { Button, DialogTrigger, Input, TooltipTrigger } from 'react-aria-components';
import { NavLink } from 'react-router';

import { Popover } from '@ui/Popover';
import { Tooltip } from '@ui/Tooltip';

import IconArrowDown from '@icons/ArrowDown';
import IconCamera from '@icons/Camera';
import IconMic from '@icons/Mic';
import IconSearch from '@icons/Search';

export default function Top() {
  return (
    <div className="sticky top-0 z-100 h-20 w-full bg-white">
      <div className="app-container flex h-full w-full items-center gap-2">
        <TopSearch />
        <ProfileSide />
      </div>
    </div>
  );
}

const TopSearch = () => {
  return (
    <div className="flex h-12 w-full items-center rounded-xl bg-[rgb(229,229,224)] ps-4 hover:bg-[rgb(218,218,211)]">
      <IconSearch className="me-2 h-4.5 w-4.5 fill-[#62625b]" />
      <Input
        className="w-full outline-none"
        placeholder="Search"
      />

      <div className="ms-3 me-1 flex h-full">
        <TooltipTrigger
          delay={0}
          closeDelay={0}
        >
          <Button className="flex aspect-square h-full cursor-pointer items-center justify-center rounded-2xl transition ease-out data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-90 data-pressed:bg-[rgb(239,239,235)]">
            <IconCamera className="h-6 w-6" />
          </Button>
          <Tooltip placement="bottom">Upload image</Tooltip>
        </TooltipTrigger>

        <TooltipTrigger
          delay={0}
          closeDelay={0}
        >
          <Button className="flex aspect-square h-full cursor-pointer items-center justify-center rounded-2xl transition ease-out data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-90 data-pressed:bg-[rgb(239,239,235)]">
            <IconMic className="h-6 w-6" />
          </Button>
          <Tooltip placement="bottom">Search by voice</Tooltip>
        </TooltipTrigger>
      </div>
    </div>
  );
};

const ProfileSide = () => {
  return (
    <div className="flex items-center">
      <TooltipTrigger
        delay={0}
        closeDelay={0}
      >
        <NavLink
          to="/app/settings"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition ease-out hover:bg-[rgb(246,246,243)] data-pressed:scale-90 data-pressed:bg-[rgb(239,239,235)]"
        >
          <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-400"></div>
        </NavLink>
        <Tooltip placement="bottom">Your profile</Tooltip>
      </TooltipTrigger>

      <DialogTrigger>
        <TooltipTrigger
          delay={0}
          closeDelay={0}
        >
          <Button className="group flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg transition ease-out hover:bg-[rgb(246,246,243)] data-pressed:scale-90 data-pressed:bg-[rgb(239,239,235)]">
            <IconArrowDown className="h-3 w-3 fill-[rgb(98,98,91)]" />
          </Button>
          <Tooltip placement="bottom">Accounts</Tooltip>
        </TooltipTrigger>

        <Popover className="flex flex-col gap-2 p-4">
          <div className="flex flex-col">
            <div className="px-3 py-2 text-xs font-medium text-[#494943]">Currently in</div>

            <NavLink
              to="/app/settings"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]"
            >
              <div className="h-15 w-15 overflow-hidden rounded-full bg-neutral-400"></div>
              <div className="flex flex-col items-start">
                <div className="leading-normal font-bold">Fuad Damirchiyev</div>
                <div className="text-sm leading-normal text-[#62625b]">Personal</div>
                <div className="text-sm leading-normal text-[#62625b]">dmirciyevfuad@gmail.com</div>
              </div>
            </NavLink>
          </div>

          <div className="flex flex-col">
            <div className="px-3 py-2 text-xs font-medium text-[#494943]">Your accounts</div>
            <Button className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-medium hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]">
              Add Pinterest account
            </Button>
            <Button className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-medium hover:bg-[rgb(246,246,243)] data-pressed:bg-[rgb(239,239,235)]">
              Log out
            </Button>
          </div>
        </Popover>
      </DialogTrigger>
    </div>
  );
};
