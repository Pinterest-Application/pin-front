import BoardPreviewCard from '@ui/pin/BoardPreviewCard';

import IconRightArrow from '@icons/ArrowRight';

export default function Inspiration() {
  return (
    <div className="bg-linear-to-b from-[#f6f6f3] to-transparent py-10 md:py-25">
      <div className="container">
        <div className="mb-2 text-center text-[28px] font-black text-[#211922] md:text-[48px]">
          Spooky season starts here
        </div>
        <div className="mb-6 text-center md:mb-16 md:text-xl">Uncover inspiration for every spellbinding moment</div>
        <div className="mb-6 aspect-3/2 w-full overflow-hidden rounded-3xl md:mb-10 md:aspect-[1.9/1]">
          <img
            src="/landing-page-inspiration-mobile.png"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>

      <div className="container">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-2xl font-black text-[#211922] md:text-[36px]">More bewitching ideas</div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5e5e0] hover:bg-[#dadad3]">
            <IconRightArrow className="h-4 w-4" />
          </div>
        </div>

        <div className="flex flex-row gap-1 overflow-x-auto">
          {new Array(10).fill(0).map((_, index) => {
            return (
              <div
                key={'boardpreview' + index}
                className="min-w-[45%] md:min-w-[calc(25%-1.33px)]"
              >
                <BoardPreviewCard />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
