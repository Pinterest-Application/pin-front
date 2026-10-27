import { NavLink } from 'react-router';

import { cn } from '@libs/cn';

export default function SidebarSettings() {
  return (
    <div className="pe-25">
      <div className="flex flex-col">
        <NavLink
          to="/app/settings"
          end
          className="mb-2 w-fit rounded-lg px-2 hover:bg-[rgba(0,0,0,0.06)]"
        >
          {({ isActive }) => {
            return (
              <>
                <div className="py-2 text-base font-bold">Edit profile</div>
                <div
                  className={cn({
                    'h-0.75 w-full rounded-full bg-transparent': true,
                    'bg-[#33332e]': isActive,
                  })}
                ></div>
              </>
            );
          }}
        </NavLink>
        <NavLink
          to="/app/settings/profile-visibility"
          className="mb-2 w-fit rounded-lg px-2 hover:bg-[rgba(0,0,0,0.06)]"
        >
          {({ isActive }) => {
            return (
              <>
                <div className="py-2 text-base font-bold">Profile visibility</div>
                <div
                  className={cn({
                    'h-0.75 w-full rounded-full bg-transparent': true,
                    'bg-[#33332e]': isActive,
                  })}
                ></div>
              </>
            );
          }}
        </NavLink>
        <NavLink
          to="/app/settings/refine"
          className="mb-2 w-fit rounded-lg px-2 hover:bg-[rgba(0,0,0,0.06)]"
        >
          {({ isActive }) => {
            return (
              <>
                <div className="py-2 text-base font-bold">Refine your recommendations</div>
                <div
                  className={cn({
                    'h-0.75 w-full rounded-full bg-transparent': true,
                    'bg-[#33332e]': isActive,
                  })}
                ></div>
              </>
            );
          }}
        </NavLink>
      </div>
    </div>
  );
}
