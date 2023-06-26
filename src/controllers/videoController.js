import { VideoService } from "../services";

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
  if (
    typeof title !== "string" ||
    title.length > 80 ||
    typeof description !== "string" ||
    description.length > 140 ||
    typeof hashtags !== "string"
  ) {
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

export const updateVideo = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  // const idx = videos.findIndex((video) => video.id === parseInt(id, 10));
  /*
  if (idx === -1) {
    console.error(new Error("video가 존재하지 않습니다."));
    return res.redirect("/");
  }

  if (typeof title !== "string") {
    console.error(new Error("video title은 string이어야합니다!"));
    return res.redirect(`/videos/${id}/edit`);
  }

  videos[idx].title = title;
  */
  return res.redirect(`/videos/${id}`);
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
    return res.render("edit", { pageTitle: `수정중 ${video.title}`, video });
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("500");
  }
};

export const search = (req, res) => res.send("Searching by...");
export const remove = (req, res) => res.send("해당 비디오를 삭제합니다.");
