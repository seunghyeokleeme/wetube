import Video from "../models/Video";
import { makeVideoData } from "../utils/dataHandler";

export const findAll = () => {
  return Video.find({}).sort({ createdAt: "desc" });
};

export const getPopularVideos = () => {};

export const uploadVideo = (fields) => {
  const data = makeVideoData(fields);
  return Video.create(data);
};

export const getVideoById = (videoId) => {
  return Video.findById(videoId);
};

export const existsVideo = (condition, toBoolean = false) => {
  const query = Video.exists(condition);
  return toBoolean ? query.then((video) => Boolean(video)) : query;
};

export const updateVideo = (videoId, { file, ...fields }) => {
  const fileUrl = file?.path;
  const data = makeVideoData({ ...fields, fileUrl });
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
