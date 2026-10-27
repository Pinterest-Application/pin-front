import { Button } from 'react-aria-components';

import AuthModal from '@ui/AuthModal';

export default function Ideas() {
  return (
    <div className="bg-linear-to-b from-[#f6f6f3] to-transparent py-16 md:py-25">
      <div className="container">
        <div className="flex flex-col items-center px-3 pb-10">
          <div className="mb-2 text-center text-[28px] font-black text-[#211922] md:text-[50px] md:font-bold">
            Bring your favorite ideas to life
          </div>
          <div className="mb-6 max-w-175 text-center md:text-xl">
            With Pinterest, you can unlock tools that spark your creativity and help you find more inspiration.
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
            <div className="mb-6 aspect-square w-full overflow-hidden rounded-3xl">
              <img
                src="/landing-page-ideas-1-mobile.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>

            <div className="md:ms-22">
              <div className="px-3 md:px-0">
                <div className="mb-2 text-center text-[22px] font-bold text-[#211922] md:text-left md:text-[38px]">
                  Search by skin tone
                </div>
                <div className="mb-6 text-center md:text-left md:text-xl">
                  Search with skin tone ranges for beauty ideas that represent you
                </div>
              </div>

              <div className="flex justify-center md:justify-start">
                <AuthModal>
                  <Button className="bg-red h-12 cursor-pointer rounded-2xl px-4 py-2 font-medium text-white duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]">
                    Join Pinterest
                  </Button>
                </AuthModal>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
            <div className="mb-6 aspect-square w-full overflow-hidden rounded-3xl md:order-2">
              <img
                src="/landing-page-ideas-2-mobile.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>

            <div className="md:ms-22">
              <div className="px-3 md:px-0">
                <div className="mb-2 text-center text-[22px] font-bold text-[#211922] md:text-left md:text-[38px]">
                  Collaborate with group boards
                </div>
                <div className="mb-6 text-center md:text-left md:text-xl">
                  Visualize your ideas with others, using a Pinterest account
                </div>
              </div>

              <div className="flex justify-center md:justify-start">
                <AuthModal>
                  <Button className="bg-red h-12 cursor-pointer rounded-2xl px-4 py-2 font-medium text-white duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]">
                    Join Pinterest
                  </Button>
                </AuthModal>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
            <div className="mb-6 aspect-square w-full overflow-hidden rounded-3xl">
              <img
                src="/landing-page-ideas-3-mobile.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>

            <div className="md:ms-22">
              <div className="px-3 md:px-0">
                <div className="mb-2 text-center text-[22px] font-bold text-[#211922] md:text-left md:text-[38px]">
                  Search visually with images
                </div>
                <div className="mb-6 text-center md:text-left md:text-xl">
                  Search objects within an image to find more styles you’ll love
                </div>
              </div>

              <div className="flex justify-center md:justify-start">
                <AuthModal>
                  <Button className="bg-red h-12 cursor-pointer rounded-2xl px-4 py-2 font-medium text-white duration-100 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]">
                    Join Pinterest
                  </Button>
                </AuthModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
