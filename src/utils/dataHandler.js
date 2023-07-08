import Video from "../models/Video";

export const makeVideoData = ({ hashtags, fileUrl, ...fields }) => {
  return {
    ...fields,
    fileUrl,
    hashtags: Video.parseHashtags(hashtags),
  };
};
