import type {
  MediaUploadResponse,
  PinCreateRequest,
  PinResponse,
  PreSignedUrlRequest,
  SupportedContentType,
} from '@models/create-pin';

import { ApiError, apiClient, toApiError } from './client';

export async function createMedia({ bucketType, contentType }: PreSignedUrlRequest): Promise<MediaUploadResponse> {
  try {
    const response = await apiClient.post<MediaUploadResponse>('/media/upload-url', { bucketType, contentType });

    return response.data;
  } catch (error) {
    throw toApiError(error, 'Failed to get an upload URL for this media.');
  }
}

export async function createPin(request: PinCreateRequest): Promise<PinResponse> {
  try {
    const response = await apiClient.post<PinResponse>('/pin', request);

    return response.data;
  } catch (error) {
    throw toApiError(error, 'Failed to create this pin.');
  }
}

export async function uploadMedia(
  preSignedUploadUrl: string,
  file: File,
  contentType: SupportedContentType
): Promise<void> {
  let response: Response;

  try {
    response = await fetch(preSignedUploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: file,
    });
  } catch {
    throw new ApiError('Could not reach the upload server. Check your connection and try again.');
  }

  if (!response.ok) {
    throw new ApiError(`Upload failed with status ${response.status}.`, response.status);
  }
}
