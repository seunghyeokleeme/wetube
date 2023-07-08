import { MulterError } from "multer";
import { CustomMulterError, NotFoundError, ValidationError } from "../errors";
import { videoUpload } from "../middlewares";
import { VideoService } from "../services";
import { isValidVideoData } from "../utils/validators";
import { determineView } from "../utils/determineView";

export const home = async (req, res, next) => {
  try {
    const videos = await VideoService.findAll();
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    next(error);
  }
};

export const handleVideoUpload = (req, res, next) => {
  const view = determineView(req.originalUrl);

  videoUpload.single("video")(req, res, (error) => {
    if (error instanceof MulterError) {
      const customMulterError = new CustomMulterError(error, view);
      next(customMulterError);
    } else {
      next(error);
    }
  });
};

export const postVideo = async (req, res, next) => {
  const {
    body: { title, description, hashtags },
    file,
  } = req;
  try {
    if (!isValidVideoData(title, description, hashtags, file)) {
      throw new ValidationError("유효하지 않는 video 데이터입니다.", "upload");
    }
    await VideoService.uploadVideo({
      title,
      description,
      hashtags,
      fileUrl: file.path,
    });
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
    file,
  } = req;
  try {
    if (!isValidVideoData(title, description, hashtags, file ?? true)) {
      throw new ValidationError("유효하지 않는 video 데이터입니다.");
    }

    const video = await VideoService.existsVideo({ _id: id }, true);
    if (!video) {
      throw new NotFoundError("해당 비디오가 존재하지 않습니다.");
    }
    await VideoService.updateVideo(id, { title, description, hashtags, file });
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    next(error);
  }
};

export const removeVideo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await VideoService.existsVideo({ _id: id }, true);
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
