import { Button } from 'react-aria-components';

import { useExpandedSidebarStore } from '@stores/expandedSidebarStore';

import IconX from '@icons/X';

export default function MessagesSection() {
  const setIsOpen = useExpandedSidebarStore((s) => s.setIsOpen);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">Messages</div>
        <Button
          onPress={() => setIsOpen(false)}
          className="mt-1 cursor-pointer rounded-md p-2 transition hover:bg-[rgb(245,245,245)]"
        >
          <IconX className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
