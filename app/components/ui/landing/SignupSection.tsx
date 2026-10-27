import { Button } from 'react-aria-components';

import AuthModal from '@ui/AuthModal';

import IconLogoMini from '@icons/LogoMini';

export default function SignupSection() {
  return (
    <div className="relative pt-20 pb-12">
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <img
          src="/landing-page-signup-bg.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="absolute top-0 left-0 z-1 h-full w-full bg-[rgba(36,36,33,0.5)]"></div>
      <div className="relative z-2 container">
        <div className="mb-6 flex items-center justify-center">
          <IconLogoMini className="h-12 w-12 fill-white" />
        </div>

        <div className="mb-6 text-center text-[36px] leading-none font-bold text-white">
          Sign up to
          <br />
          get your ideas
        </div>

        <div className="mb-5 flex flex-col items-center">
          <AuthModal>
            <Button className="bg-red h-12 w-fit cursor-pointer rounded-2xl px-5 py-2 font-medium text-white duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]">
              Continue with google
            </Button>
          </AuthModal>
        </div>

        <div className="px-8 text-center text-xs text-white">
          By continuing, you agree to Pinterest's <span className="underline">Terms of Service</span> and acknowledge
          you've read our <span className="underline">Privacy Policy</span>.{' '}
          <span className="underline">Notice at collection</span>.
        </div>
      </div>
    </div>
  );
}
