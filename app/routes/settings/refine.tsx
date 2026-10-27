import { SwitchSettings } from '@ui/settings/Switch';

export default function RefinePage() {
  return (
    <div className="max-w-125">
      <div className="mb-2 text-[28px] font-bold">Refine your recommendations</div>
      <div className="mb-8">
        Make your Pinterest more you. Edit the details Pinterest uses to recommend ideas to you. These details won’t be
        shown publicly.
      </div>

      <div className="flex flex-col">
        <SwitchSettings className="flex w-full items-center justify-between rounded-lg px-2 py-4 hover:bg-[rgb(245,245,245)]">
          Architecture
        </SwitchSettings>
        <SwitchSettings className="flex w-full items-center justify-between rounded-lg px-2 py-4 hover:bg-[rgb(245,245,245)]">
          Art
        </SwitchSettings>
        <SwitchSettings className="flex w-full items-center justify-between rounded-lg px-2 py-4 hover:bg-[rgb(245,245,245)]">
          Beauty
        </SwitchSettings>
      </div>
    </div>
  );
}
