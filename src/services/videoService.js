import { HashtagService } from "../services";
import Video from "../models/Video";

export const findAll = () => {
  return Video.find({});
};

export const uploadVideo = (fields) => {
  const { title, description, hashtags } = fields;
  const data = {
    title,
    description,
    hashtags: HashtagService.parseHashtags(hashtags),
  };
  return Video.create(data);
};

export const getVideoById = (videoId) => {
  return Video.findById(videoId);
};

export const updateVideo = (videoId, fields) => {
  const { title, description, hashtags } = fields;
  const data = {
    title,
    description,
    hashtags: HashtagService.parseHashtags(hashtags),
  };
  return Video.findByIdAndUpdate(videoId, data, { new: true });
};
