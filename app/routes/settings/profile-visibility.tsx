import { SwitchSettings } from '@ui/settings/Switch';

export default function ProfileVisibilityPage() {
  return (
    <div className="max-w-125">
      <div className="mb-2 text-[28px] font-bold">Profile Visibility</div>
      <div className="mb-8">Manage how your profile can be viewed on and off of Pinterest.</div>

      <div className="flex flex-col">
        <SwitchSettings className="flex w-full items-center justify-between rounded-lg px-2 py-4 hover:bg-[rgb(245,245,245)]">
          <div className="mb-1 font-bold">Private profile</div>
          <div>
            When your profile is private only the people you approve can see your profile, Pins, boards, followers and
            following lists.
          </div>
        </SwitchSettings>
        <SwitchSettings className="flex w-full items-center justify-between rounded-lg px-2 py-4 hover:bg-[rgb(245,245,245)]">
          <div className="mb-1 font-bold">Search privacy</div>
          <div>Hide your profile and boards from search engines (ex. Google).</div>
        </SwitchSettings>
      </div>
    </div>
  );
}
