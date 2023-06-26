import { VideoService } from "../services";

export const home = async (req, res) => {
  try {
    const videos = await VideoService.findAll();
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "서버 내부 오류가 발생했습니다.",
    });
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
    return res.status(400).json({
      error:
        "유효하지 않는 데이터, title, description, hashtags는 적절한 길이의 string 타입이어야 합니다.",
    });
  }
  try {
    await VideoService.uploadVideo({ title, description, hashtags });
    return res.redirect("/");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "서버 내부 오류가 발생했습니다.",
    });
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "업로드" });
};

export const getVideo = (req, res) => {
  const { id } = req.params;
  // const video = videos.find((video) => video.id === parseInt(id, 10));
  return res.render("watch");
  /*
  if (video) {
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
  } else {
    return res.redirect("/");
  }
  */
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

export const getEdit = (req, res) => {
  const { id } = req.params;
  // const video = videos.find((video) => video.id === parseInt(id, 10));
  /*
  if (video) {
    return res.render("edit", { pageTitle: `수정중 ${video.title}`, video });
  } else {
    return res.redirect("/");
  }
  */
  return res.render("edit");
};

export const search = (req, res) => res.send("Searching by...");
export const remove = (req, res) => res.send("해당 비디오를 삭제합니다.");
