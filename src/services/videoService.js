import Video from "../models/Video";

export const findAll = () => {
  return Video.find({}).sort({ createdAt: "desc" });
};

export const getPopularVideos = () => {};

export const uploadVideo = (fields) => {
  const { title, description, hashtags, fileUrl } = fields;
  // ToDo: data 중복코드 분리하기
  const data = {
    fileUrl,
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
  const { title, description, hashtags, file } = fields;
  // ToDo: data 중복코드 분리하기
  const data = {
    fileUrl: file?.path,
    title,
    description,
    hashtags: Video.parseHashtags(hashtags),
  };
  return Video.findByIdAndUpdate(videoId, data);
};

export const deleteVideo = (videoId) => {
  return Video.findByIdAndDelete(videoId);
};

export const searchVideos = (query) => {
  return Video.find({ title: { $regex: new RegExp(`${query}$`, "i") } });
};

export const likeVideo = (videoId) => {};

export const dislikeVideo = (videoId) => {};
