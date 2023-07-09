import { UserService } from ".";
import Video from "../models/Video";
import { makeVideoData } from "../utils/dataHandler";

export const findAll = () => {
  return Video.find({}).sort({ createdAt: "desc" });
};

export const getPopularVideos = () => {};

export const uploadVideo = async (ownerId, fields) => {
  const data = makeVideoData(fields);
  const newVideo = await Video.create(data);
  const user = await UserService.getUserById(ownerId);
  user.videos.push(newVideo._id);
  await user.save();
};

export const getVideoById = (videoId) => {
  return Video.findById(videoId);
};

export const existsVideo = (condition, toBoolean = false) => {
  const query = Video.exists(condition);
  return toBoolean ? query.then((video) => Boolean(video)) : query;
};

export const updateVideo = (videoId, fields) => {
  const data = makeVideoData(fields);
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
