import IconLogoWhite from '@icons/LogoWhite';

export default function Footer() {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-9 bg-black px-6 py-9 md:flex-row lg:px-37.5 lg:py-25">
      <IconLogoWhite className="h-6 w-25 md:h-10 md:w-40" />

      <div className="flex w-full flex-col flex-wrap justify-between text-nowrap md:max-w-lg md:flex-row lg:max-w-xl">
        <div className="mb-8 flex flex-col gap-4 text-white md:mb-0 md:w-1/3">
          <div className="font-bold">Get the app</div>
          <div>iOS</div>
          <div>Android</div>
        </div>
        <div className="mb-8 flex flex-col gap-4 text-white md:mb-0 md:w-1/3">
          <div className="font-bold">Quick Links</div>
          <div>Explore</div>
          <div>Shop</div>
          <div>Help Center</div>
        </div>
        <div className="flex flex-col gap-4 text-white md:w-1/3">
          <div className="font-bold">Policies</div>
          <div>Terms of service</div>
          <div>Privacy policy</div>
          <div>Non-user notice</div>
        </div>
      </div>

      <div className="w-full text-sm text-white">© 2026 Pinterest</div>
    </div>
  );
}
