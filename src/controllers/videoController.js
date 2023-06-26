import { VideoService } from "../services";
import { isValidVideoData } from "../utils/validators";

export const home = async (req, res) => {
  try {
    const videos = await VideoService.findAll();
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("500");
  }
};

export const postVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  if (!isValidVideoData(title, description, hashtags)) {
    return res.redirect("/videos/upload");
  }
  try {
    await VideoService.uploadVideo({ title, description, hashtags });
    return res.redirect("/");
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("500");
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "업로드" });
};

export const getVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await VideoService.getVideoById(id);
    if (!video) {
      return res
        .status(404)
        .render("404", { pageTitle: "해당 video 가 존재하지 않습니다." });
    }

    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("500");
  }
};

export const updateVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
  } = req;
  if (!isValidVideoData(title, description, hashtags)) {
    return res.redirect(`/videos/${id}/edit`);
  }
  try {
    const video = await VideoService.existsVideo({ _id: id }, true);
    if (!video) {
      return res
        .status(404)
        .render("404", { pageTitle: "해당 video 가 존재하지 않습니다." });
    }
    await VideoService.updateVideo(id, { title, description, hashtags });
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("500");
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await VideoService.getVideoById(id);
    if (!video) {
      return res
        .status(404)
        .render("404", { pageTitle: "해당 video 가 존재하지 않습니다." });
    }
    return res.render("edit", { pageTitle: `수정 중 ${video.title}`, video });
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("500");
  }
};

export const search = (req, res) => res.send("Searching by...");
export const remove = (req, res) => res.send("해당 비디오를 삭제합니다.");
