import { useRef } from 'react';

import { Button } from 'react-aria-components';

import Spinner from '@ui/Spinner';

import { useLoadImage } from '@hooks/useLoadImage';

import IconMedia from '@icons/Media';
import IconPen from '@icons/Pen';

import { cn } from '@libs/cn';

export default function ImageLoad() {
  const { aspectRatio, handleFileChange, handleImageLoad, previewUrl, isUploading, uploadError, mediaId } =
    useLoadImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div
        style={{ aspectRatio: aspectRatio ?? 0.7 + '/1' }}
        className={cn({
          'relative z-0 w-full overflow-hidden rounded-4xl border border-[#c8c8c1] bg-[#e5e5e0]': true,
          'border-none': previewUrl !== null,
        })}
      >
        <input
          ref={fileInputRef}
          type="file"
          className={cn('absolute top-0 left-0 z-10 h-full w-full cursor-pointer opacity-0', {
            'pointer-events-none': previewUrl !== null,
          })}
          accept="image/gif,image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Pin preview"
              className="relative z-19 h-full w-full object-cover"
              onLoad={handleImageLoad}
            />
            <Button
              onPress={() => fileInputRef.current?.click()}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white transition data-hovered:bg-[rgb(246,246,243)] data-pressed:scale-90 data-pressed:bg-[rgb(239,239,235)]"
            >
              <IconPen className="h-4 w-4" />
            </Button>
            {isUploading && (
              <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black/40">
                <Spinner
                  size={32}
                  className="border-white/40 border-t-white"
                />
              </div>
            )}
          </>
        ) : (
          <div className="absolute top-0 left-0 z-1 flex h-full w-full flex-col items-center justify-center">
            <IconMedia className="h-8 w-8" />
            <div className="py-3 text-sm font-bold">Upload your media</div>
            <div className="max-w-50 text-center text-sm text-[#62625b]">
              Select multiple files in your file picker with Shift or Cmd/Ctrl
            </div>
            <div className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center text-sm text-[#62625b]">
              JPG, PNG up to 20MB, MP4 up to 200MB
            </div>
          </div>
        )}
      </div>
      {uploadError && <div className="mt-2 text-center text-sm text-[#cc001f]">{uploadError}</div>}
      <input type="hidden" name="mediaId" value={mediaId ?? ''} />
    </div>
  );
}
