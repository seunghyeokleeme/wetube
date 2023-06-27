import Video from "../models/Video";

export const findAll = () => {
  return Video.find({});
};

export const getPopularVideos = () => {};

export const uploadVideo = (fields) => {
  const { title, description, hashtags } = fields;
  const data = {
    title,
    description,
    hashtags: Video.parseHashtags(hashtags),
  };
  return Video.create(data);
};

export const getVideoById = (videoId) => {
  return Video.findById(videoId);
};

export const existsVideo = (condition, toBoolean = false) => {
  const query = Video.exists(condition);
  return toBoolean ? query.then((video) => Boolean(video)) : query;
};

export const updateVideo = (videoId, fields) => {
  const { title, description, hashtags } = fields;
  const data = {
    title,
    description,
    hashtags: Video.parseHashtags(hashtags),
  };
  return Video.findByIdAndUpdate(videoId, data);
};

export const deleteVideo = (videoId) => {
  return Video.findByIdAndDelete(videoId);
};

export const likeVideo = (videoId) => {};

export const dislikeVideo = (videoId) => {};

export const searchVideos = (keyword) => {};
