import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.error(error);
    return res.status(500).render("server-error");
  }
};

export const postVideo = (req, res) => {
  const { title, description, hashtags } = req.body;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof hashtags !== "string"
  ) {
    return res.status(400).redirect("/videos/upload");
  }
  console.log(title, description, hashtags);
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags
      .split(",")
      .map((word) =>
        word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`
      ),
    meta: {
      views: 0,
      likes: 0,
    },
  });
  console.log(video);
  /*
  const newVideo = {
    id: videos.length + 1,
    title,
    likes: 0,
    comments: 0,
    createdAt: "1분",
    views: 0,
  };
  videos.push(newVideo);
  */
  return res.redirect("/");
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
