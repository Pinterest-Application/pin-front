import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

import type { clientAction } from '~/routes/create-pin';

export function useLoadImage() {
  const fetcher = useFetcher<typeof clientAction>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.set('actionType', 'createMedia');
    formData.set('contentType', file.type);
    formData.set('file', file);

    fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });
  }

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setAspectRatio(naturalWidth / naturalHeight);
  }

  const isUploading = fetcher.state !== 'idle';
  const uploadError = fetcher.data && fetcher.data.success === false ? fetcher.data.error : null;
  const mediaId = fetcher.data && fetcher.data.success ? fetcher.data.data.media.id : null;

  return { handleFileChange, handleImageLoad, aspectRatio, previewUrl, isUploading, uploadError, mediaId };
}
