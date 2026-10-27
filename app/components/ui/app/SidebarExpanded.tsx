import { useExpandedSidebarStore } from '@stores/expandedSidebarStore';

import { cn } from '@libs/cn';

import MessagesSection from './MessagesSection';
import NotificationSection from './NotificationSection';

export default function SidebarExpanded() {
  const isOpen = useExpandedSidebarStore((s) => s.isOpen);
  const type = useExpandedSidebarStore((s) => s.type);

  return (
    <div
      className={cn({
        'fixed top-0 left-0 z-99 h-screen w-92.5 min-w-92.5 -translate-x-full overflow-x-hidden overflow-y-auto bg-white opacity-0 transition duration-500': true,
        'translate-x-18 border-r border-[#c8c8c1] opacity-100': isOpen,
      })}
    >
      {type === 'notification' && <NotificationSection />}
      {type === 'messages' && <MessagesSection />}
    </div>
  );
}
