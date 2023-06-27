import { NotFoundError, ValidationError } from "../errors";
import { VideoService } from "../services";
import { isValidVideoData } from "../utils/validators";

export const home = async (req, res, next) => {
  try {
    const videos = await VideoService.findAll();
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    next(error);
  }
};

export const postVideo = async (req, res, next) => {
  const { title, description, hashtags } = req.body;
  try {
    if (!isValidVideoData(title, description, hashtags)) {
      throw new ValidationError("유효하지 않는 video 데이터입니다.", "upload");
    }
    await VideoService.uploadVideo({ title, description, hashtags });
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "업로드" });
};

export const getVideo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await VideoService.getVideoById(id);
    if (!video) {
      throw new NotFoundError("해당 비디오가 존재하지 않습니다.");
    }

    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  const {
    params: { id },
    body: { title, description, hashtags },
  } = req;
  try {
    if (!isValidVideoData(title, description, hashtags)) {
      throw new ValidationError("유효하지 않는 video 데이터입니다.");
    }

    const video = await VideoService.existsVideo({ _id: id }, true);
    if (!video) {
      throw new NotFoundError("해당 비디오가 존재하지 않습니다.");
    }
    await VideoService.updateVideo(id, { title, description, hashtags });
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    next(error);
  }
};

export const removeVideo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await VideoService.getVideoById(id);
    if (!video) {
      throw new NotFoundError("해당 비디오가 존재하지 않습니다.");
    }
    await VideoService.deleteVideo(id);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const getEdit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await VideoService.getVideoById(id);
    if (!video) {
      throw new NotFoundError("해당 비디오가 존재하지 않습니다.");
    }
    return res.render("edit", { pageTitle: `수정 중 ${video.title}`, video });
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const { keyword } = req.query;
  try {
    let videos = [];
    if (keyword) {
      videos = await VideoService.searchVideos(keyword);
    }
    return res.render("search", { pageTitle: "Search", videos });
  } catch (error) {
    next(error);
  }
};
