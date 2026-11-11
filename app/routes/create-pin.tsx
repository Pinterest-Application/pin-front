import { Button, Input, Label, TextArea } from 'react-aria-components';
import { Form, redirect, useActionData, useNavigation } from 'react-router';

import ImageLoad from '@ui/create/ImageLoad';
import PinDrafts from '@ui/create/PinDrafts';

import type { SupportedContentType } from '@models/create-pin';

import { ApiError } from '@api/client';
import { createMedia, createPin, uploadMedia } from '@api/create-pin';

import type { Route } from './+types/create-pin';

const HEADER_HEIGHT_PX = 152;

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  let actionType = formData.get('actionType');

  if (!actionType) {
    return null;
  } else if (actionType === 'createMedia') {
    let contentType = formData.get('contentType') as SupportedContentType;
    let file = formData.get('file') as File | null;

    if (!file) {
      return { success: false as const, error: 'No file was provided.' };
    }

    try {
      const createMediaResp = await createMedia({
        bucketType: 'PIN_IMAGES',
        contentType: contentType,
      });

      await uploadMedia(createMediaResp.preSignedUploadUrl, file, contentType);

      return { success: true as const, data: createMediaResp };
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Something went wrong. Please try again.';

      return { success: false as const, error: message };
    }
  } else if (actionType === 'createPin') {
    let mediaId = formData.get('mediaId') as string | null;
    let title = formData.get('title') as string | null;
    let description = formData.get('description') as string | null;

    if (!mediaId) {
      return { success: false as const, error: 'Upload an image before publishing.' };
    }

    if (!title) {
      return { success: false as const, error: 'Title is required.' };
    }

    try {
      await createPin({
        mediaId,
        title,
        description: description || undefined,
      });

      return redirect('/app');
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Something went wrong. Please try again.';

      return { success: false as const, error: message };
    }
  }
}

export default function CreatePin() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isPublishing =
    navigation.state === 'submitting' && navigation.formData?.get('actionType') === 'createPin';
  const publishError = actionData && 'error' in actionData ? actionData.error : null;

  return (
    <Form
      method="post"
      className="relative"
    >
      <input
        type="hidden"
        name="actionType"
        value="createPin"
      />

      <div className="flex h-18 w-full items-center justify-between border-y border-[#c8c8c1] px-4">
        <div className="text-xl font-bold">Create Pin</div>
        <Button
          type="submit"
          isDisabled={isPublishing}
          className="bg-red ease h-12 cursor-pointer rounded-2xl px-4 py-2 text-base font-medium text-white transition duration-100 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-hovered:bg-[#cc001f] data-pressed:scale-95 data-pressed:bg-[#b2001b]"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </Button>
      </div>

      <div
        className="relative overflow-auto"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT_PX}px)` }}
      >
        <div className="fixed right-8 bottom-4 z-10">
          <PinDrafts />
        </div>

        <div className="mx-auto grid w-full max-w-186 grid-cols-[300px_1fr] gap-4 pt-4 pb-20">
          <ImageLoad />

          <div className="flex flex-col gap-4">
            {publishError && <div className="text-sm text-[#cc001f]">{publishError}</div>}

            <Label className="w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
              <div className="mb-2 text-xs font-medium">Title</div>
              <Input
                name="title"
                className="w-full outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]"
                placeholder="Tell everyone what your Pin is about"
              />
            </Label>

            <Label className="w-full cursor-pointer rounded-2xl border border-[#91918c] px-4 pt-4 pb-4 -outline-offset-1 has-focus:outline-2 has-focus:outline-[#435ee5]">
              <div className="mb-2 text-xs font-medium">Description</div>
              <TextArea
                name="description"
                className="field-sizing-content min-h-12 w-full resize-none outline-none placeholder:text-[#767676] focus:placeholder:text-[#cdcdcd]"
                placeholder="Describe your pin"
              />
            </Label>
          </div>
        </div>
      </div>
    </Form>
  );
}
