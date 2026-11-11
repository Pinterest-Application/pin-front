import { Button, Input, Label } from 'react-aria-components';

import AuthModal from '@ui/AuthModal';

import IconLogo from '@icons/Logo';
import IconSearch from '@icons/Search';

import { cn } from '@libs/cn';

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-10 bg-white py-2.25 shadow-[0_1px_0_0_rgba(0,0,0,0.08)] md:py-4">
      <div className="flex items-center justify-between gap-4 px-4 md:px-8">
        <IconLogo
          className="h-5 w-27.5 md:h-7 md:w-32"
          width={110}
          height={20}
        />

        <div className="hidden w-full items-center md:flex">
          <AuthModal>
            <Button className="group me-4 h-12 cursor-pointer rounded-2xl px-4 py-2 font-medium tracking-wide duration-100 data-hovered:bg-[hsla(60,14%,96%,0.5)] data-pressed:bg-[hsla(60,14%,96%,0.7)]">
              <div className="duration-100 group-data-pressed:scale-95">Explore</div>
            </Button>
          </AuthModal>

          <AuthModal>
            <Button className="w-2/3">
              <Label className="flex h-12 w-full items-center gap-2 rounded-xl bg-[#e5e5e0] ps-4 pe-2 hover:bg-[rgb(218,218,211)]">
                <IconSearch className="h-4 w-4 fill-[#62625b]" />
                <Input
                  className="w-full outline-none"
                  placeholder="Search for easy dinners, fashion, etc."
                />
              </Label>
            </Button>
          </AuthModal>
        </div>

        <div className="flex md:gap-2">
          <AuthModal>
            <Button
              className={cn({
                'bg-red h-9 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium tracking-wide text-nowrap text-white transition duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]': true,
                'md:h-12 md:rounded-2xl md:text-base': true,
              })}
            >
              Join Pinterest
            </Button>
          </AuthModal>
        </div>
      </div>
    </header>
  );
}
