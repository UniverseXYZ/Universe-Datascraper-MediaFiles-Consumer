import { MediaFileType } from 'datascraper-schema';

const MediaTypesDic: Record<string, MediaFileType> = {
  image: MediaFileType.Image,
  audio: MediaFileType.Audio,
  video: MediaFileType.Video,
  model: MediaFileType.Model,
  iframe: MediaFileType.IFRAME,
};

export const getMediaTypeByContentType = (
  contentType: string,
): MediaFileType => {
  const key = Object.keys(MediaTypesDic).find((key) =>
    contentType.includes(key),
  );
  return MediaTypesDic[key] ?? MediaFileType.Misc;
};
