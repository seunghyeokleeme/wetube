import Video from "../models/Video";
import { dto } from "../utils";

export const findAll = () => {
  return Video.find({});
};

export const create = (fields) => {
  const data = dto.video(fields);
  return Video.create(data);
};
