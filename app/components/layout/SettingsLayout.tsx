import { Outlet } from 'react-router';

import SidebarSettings from '@ui/settings/Sidebar';

export default function SettingsLayout() {
  return (
    <div className="app-container h-[calc(100vh-80px)] overflow-y-auto pt-4">
      <div className="h- grid grid-cols-[300px_1fr]">
        <SidebarSettings />
        <Outlet />
      </div>
    </div>
  );
}
