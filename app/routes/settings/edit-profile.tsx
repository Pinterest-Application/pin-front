import { Button, Input, Label, TextArea } from 'react-aria-components';

export default function EditProfilePage() {
  return (
    <div className="max-w-125">
      <div className="mb-2 text-[28px] font-bold">Edit Profile</div>
      <div className="mb-8">
        Keep your personal details private. Information you add here is visible to anyone who can view your profile.
      </div>

      <div className="mb-6">
        <div className="mb-2 text-xs">Photo</div>
        <div className="flex items-center gap-4">
          <div className="aspect-square w-20 rounded-full bg-neutral-400"></div>
          <Button className="cursor-pointer rounded-xl bg-[#e5e5e0] px-3 py-2 text-sm font-medium transition data-hovered:bg-[#dadad3] data-pressed:scale-95 data-pressed:bg-[#cecec5]">
            Change
          </Button>
        </div>
      </div>

      <Label className="mb-4 block w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
        <div className="mb-2 text-xs font-medium">Name</div>
        <Input
          className="w-full outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]"
          placeholder="Add your name"
        />
      </Label>

      <Label className="mb-4 block w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
        <div className="mb-2 text-xs font-medium">About</div>
        <TextArea
          className="field-sizing-content min-h-12 w-full resize-none outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]"
          placeholder="Tell your story"
        />
      </Label>

      <Label className="mb-4 block w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
        <div className="mb-2 text-xs font-medium">Username</div>
        <Input className="w-full outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]" />
      </Label>
    </div>
  );
}
