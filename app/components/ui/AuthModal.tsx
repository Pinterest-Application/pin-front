import type { ReactNode } from 'react';
import { Button, Dialog, DialogTrigger, Heading } from 'react-aria-components';

import IconGoogle from '@icons/Google';
import IconLogoMini from '@icons/LogoMini';
import IconX from '@icons/X';

import { loginWithGoogle } from '@libs/auth';

import Modal from './Modal';

interface AuthModalProps {
  children: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  return (
    <DialogTrigger>
      {children}
      <Modal isDismissable>
        <Dialog className="p-6 text-left">
          <Heading
            slot="title"
            className="mb-4 flex items-center justify-between"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgb(246,246,243)]">
              <IconLogoMini className="fill-red h-9 w-9" />
            </div>
            <Button
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl data-hovered:bg-[rgb(246,246,243)]"
              slot="close"
            >
              <IconX className="h-6 w-6" />
            </Button>
          </Heading>

          <div className="text-[28px] font-bold">Welcome to Pinterest</div>
          <div className="mb-6">Log in to discover more ideas just for you</div>

          <Button
            onPress={loginWithGoogle}
            className="relative mb-6 flex h-12 w-full cursor-pointer items-center rounded-2xl border border-[#91918c] px-4 py-3 text-base leading-none font-medium text-[#211922] data-hovered:bg-[rgb(246,246,243)] md:text-lg"
          >
            <IconGoogle className="h-6 w-6" />
            <div className="absolute top-1/2 left-1/2 -translate-1/2 whitespace-nowrap">Continue with google</div>
          </Button>

          <div className="flex items-center gap-1 text-xs text-[#62625b]">
            <div className="underline">Terms of Service</div>
            <div>·</div>
            <div className="underline">Privacy Policy</div>
            <div>·</div>
            <div className="underline">Notice at Collection</div>
          </div>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
