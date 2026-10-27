import { Outlet } from 'react-router';
import { authClientMiddleware } from '~/middlewares/auth';

import Sidebar from '@ui/app/Sidebar';
import SidebarExpanded from '@ui/app/SidebarExpanded';
import Top from '@ui/app/Top';

import { useExpandedSidebarStore } from '@stores/expandedSidebarStore';

import { cn } from '@libs/cn';

import type { Route } from './+types/AppLayout';

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [authClientMiddleware];

export async function clientLoader() {
  return null;
}

clientLoader.hydrate = true;

export function HydrateFallback() {
  return (
    <div className="flex h-screen items-center justify-center text-neutral-500">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
    </div>
  );
}

export default function AppLayout() {
  const isOpen = useExpandedSidebarStore((s) => s.isOpen);

  return (
    <main className="relative flex justify-between">
      <Sidebar />
      <SidebarExpanded />
      <div
        className={cn({
          'flex w-full flex-col transition-[width] duration-500': true,
          'w-[calc(100%-442px)]': isOpen,
        })}
      >
        <Top />
        <Outlet />
      </div>
    </main>
  );
}
