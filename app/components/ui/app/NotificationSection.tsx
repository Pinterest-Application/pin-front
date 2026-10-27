import { Button } from 'react-aria-components';

import NotificationCard from '@ui/notification/NotificationCard';

import { useExpandedSidebarStore } from '@stores/expandedSidebarStore';

import IconX from '@icons/X';

export default function NotificationSection() {
  const setIsOpen = useExpandedSidebarStore((s) => s.setIsOpen);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">Notifications</div>
        <Button
          onPress={() => setIsOpen(false)}
          className="mt-1 cursor-pointer rounded-md p-2 transition hover:bg-[rgb(245,245,245)]"
        >
          <IconX className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-[calc(100vh-68px)] overflow-x-hidden overflow-y-auto p-2">
        <div>
          <div className="mb-2 p-2">Updates</div>
          <div className="flex flex-col gap-1">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </div>
      </div>
    </>
  );
}
