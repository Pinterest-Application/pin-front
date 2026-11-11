export type BucketType = 'PIN_IMAGES' | 'PROFILE_IMAGES';
export type SupportedContentType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

export interface MediaCreateRequest {
  objectKey: string;
  bucketType: BucketType;
  mediaType: string;
  originalFileName: string;
}

export interface PreSignedUrlRequest {
  bucketType: BucketType;
  contentType: SupportedContentType;
  fileName?: string;
}

export interface MediaResponse {
  id: string;
  objectKey: string;
  bucketType: BucketType;
  mediaType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  originalFileName: string;
  isActive: boolean;
  createdAt: string;
}

export interface MediaUploadResponse {
  media: MediaResponse;
  preSignedUploadUrl: string;
}

export interface PinCreateRequest {
  mediaId: string; // UUID, required
  title: string; // required, max 150 chars
  description?: string; // optional, max 2000 chars
}

export interface PinResponse {
  id: string;
  userId: string;
  mediaId: string;
  title: string;
  description: string | null;
  likeCount: number;
  commentCount: number;
  isActive: boolean;
  createdAt: string;
}
