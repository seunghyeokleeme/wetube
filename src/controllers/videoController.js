import Video from "../models/Video";

export const home = (req, res) => {
  Video.find({})
    .then((videos) => {
      console.log("videos", videos);
      return res.render("home", { pageTitle: "Home", videos });
    })
    .catch((err) => console.error(err));
};

export const postVideo = (req, res) => {
  const { title } = req.body;
  if (typeof title !== "string") {
    console.error(new Error("video title은 string이어야합니다!"));
    return res.redirect("/videos/upload");
  }
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
