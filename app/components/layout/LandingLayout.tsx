import { Outlet } from 'react-router';

import LandingHeader from '@ui/landing/Header';

export default function LandingLayout() {
  return (
    <div>
      <LandingHeader />
      <Outlet />
    </div>
  );
}
