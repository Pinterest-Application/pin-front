import { Button, TooltipTrigger } from 'react-aria-components';
import { NavLink } from 'react-router';

import { Tooltip } from '@ui/Tooltip';

import { useExpandedSidebarStore } from '@stores/expandedSidebarStore';

import IconBoard from '@icons/Board';
import IconCreate from '@icons/Create';
import IconCreateFilled from '@icons/CreateFilled';
import IconHome from '@icons/Home';
import IconHomeFilled from '@icons/HomeFilled';
import IconLogoMini from '@icons/LogoMini';
import IconMessages from '@icons/Messages';
import IconMessagesFilled from '@icons/MessagesFilled';
import IconNotification from '@icons/Notification';
import IconNotificationFilled from '@icons/NotificationFilled';
import IconRefine from '@icons/Refine';
import IconSettings from '@icons/Settings';
import IconSettingsFilled from '@icons/SettingsFilled';

export default function Sidebar() {
  const isOpen = useExpandedSidebarStore((s) => s.isOpen);
  const setIsOpen = useExpandedSidebarStore((s) => s.setIsOpen);
  const setType = useExpandedSidebarStore((s) => s.setType);
  const type = useExpandedSidebarStore((s) => s.type);

  const setUpdatesOpen = (newIsOpen: boolean) => {
    if (isOpen && type !== 'notification') {
      setType('notification');
    } else {
      setIsOpen(newIsOpen);
      setType('notification');
    }
  };

  const setMessagesOpen = (newIsOpen: boolean) => {
    if (isOpen && type !== 'messages') {
      setType('messages');
    } else {
      setIsOpen(newIsOpen);
      setType('messages');
    }
  };

  const isUpdatesActive = type === 'notification' && isOpen;
  const isMessagesActive = type === 'messages' && isOpen;

  return (
    <nav className="sticky top-0 left-0 z-100 h-screen w-18 min-w-18 overflow-x-hidden overflow-y-auto border-r border-[#c8c8c1] bg-white">
      <div className="flex h-full flex-col items-center justify-between py-4">
        <div className="flex flex-col gap-6">
          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <NavLink
              to="/app"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-[rgb(246,246,243)] active:scale-95 active:bg-[rgb(239,239,235)]"
            >
              <IconLogoMini className="fill-red h-6 w-6" />
            </NavLink>
            <Tooltip placement="end">Home</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <NavLink
              to="/app"
              end
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-[rgb(246,246,243)] active:scale-95 active:bg-[rgb(239,239,235)]"
            >
              {({ isActive }) => (isActive ? <IconHomeFilled className="h-6 w-6" /> : <IconHome className="h-6 w-6" />)}
            </NavLink>
            <Tooltip placement="end">Home</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <Button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-95 data-pressed:bg-[rgb(239,239,235)]">
              <IconBoard className="h-6 w-6" />
            </Button>
            <Tooltip placement="end">Your Boards</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <NavLink
              to="/app/create"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-[rgb(246,246,243)] active:scale-95 active:bg-[rgb(239,239,235)]"
            >
              {({ isActive }) =>
                isActive ? <IconCreateFilled className="h-6 w-6" /> : <IconCreate className="h-6 w-6" />
              }
            </NavLink>
            <Tooltip placement="end">Create</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <Button
              onPress={() => setUpdatesOpen(!isOpen)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-95 data-pressed:bg-[rgb(239,239,235)]"
            >
              {isUpdatesActive ? (
                <IconNotificationFilled className="h-6 w-6" />
              ) : (
                <IconNotification className="h-6 w-6" />
              )}
            </Button>
            <Tooltip placement="end">Updates</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <Button
              onPress={() => setMessagesOpen(!isOpen)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-95 data-pressed:bg-[rgb(239,239,235)]"
            >
              {isMessagesActive ? <IconMessagesFilled className="h-6 w-6" /> : <IconMessages className="h-6 w-6" />}
            </Button>
            <Tooltip placement="end">Messages</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <NavLink
              to="/app/settings/refine"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-[rgb(246,246,243)] active:scale-95 active:bg-[rgb(239,239,235)]"
            >
              <IconRefine className="h-6 w-6" />
            </NavLink>
            <Tooltip
              placement="end"
              className="max-w-40"
            >
              Refine your recommendations
            </Tooltip>
          </TooltipTrigger>
        </div>

        <div>
          <TooltipTrigger
            delay={0}
            closeDelay={0}
          >
            <NavLink
              to="/app/settings"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-[rgb(246,246,243)] active:scale-95 active:bg-[rgb(239,239,235)]"
            >
              {({ isActive }) =>
                isActive ? <IconSettingsFilled className="h-6 w-6" /> : <IconSettings className="h-6 w-6" />
              }
            </NavLink>
            <Tooltip placement="end">Settings & Support</Tooltip>
          </TooltipTrigger>
        </div>
      </div>
    </nav>
  );
}
