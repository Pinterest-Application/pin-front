import { Button } from 'react-aria-components';

export default function LandingIntro() {
  return (
    <>
      <div className="relative hidden h-120 md:block">
        <div className="absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
          <img
            src="/landing-page-intro-desktop.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="relative z-1 container flex h-full flex-col justify-center">
          <div className="mb-9 text-5xl leading-tight font-black text-white">
            Conjure your best
            <br /> Halloween
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-red h-12 rounded-2xl px-4 py-2 font-medium text-white">
              Join Pinterest for free
            </Button>
          </div>
        </div>
      </div>

      <div className="pb-10 md:hidden">
        <div className="aspect-[1/0.8] w-full">
          <img
            src="/landing-page-intro-mobile.jpg"
            className="h-full w-full object-cover"
            alt=""
          />{' '}
        </div>
        <div className="container">
          <div className="mt-4 mb-6 flex items-center justify-center text-center text-[28px] leading-tight font-black text-[#211922]">
            Conjure your best Halloween
          </div>

          <div className="mx-2 flex flex-col gap-2">
            <Button className="bg-red mb-4 h-12 w-full rounded-2xl px-3 py-1.5 font-medium tracking-wide text-white">
              Continue with google
            </Button>
            <div className="text-center text-xs tracking-wide text-[#62625b]">
              By continuing, you agree to Pinterest's <span className="underline">Terms of Service</span> and
              acknowledge you've read our <span className="underline">Privacy Policy</span>.{' '}
              <span className="underline">Notice at collection</span>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
