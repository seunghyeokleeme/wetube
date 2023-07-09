import Video from "../models/Video";

export const makeVideoData = ({ hashtags, file, ...fields }) => {
  const fileUrl = file?.path || fields.fileUrl;
  return {
    ...fields,
    fileUrl,
    hashtags: Video.parseHashtags(hashtags),
  };
};
