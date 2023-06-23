let videos = [
  {
    id: 1,
    title: "First Video",
    likes: 5,
    comments: 2,
    createdAt: "8년",
    views: 1,
  },
  {
    id: 2,
    title: "Second Video",
    likes: 5,
    comments: 2,
    createdAt: "5일",
    views: 59,
  },
  {
    id: 3,
    title: "Third Video",
    likes: 5,
    comments: 2,
    createdAt: "2분",
    views: 59,
  },
];

export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });

export const postVideo = (req, res) => {
  const { title } = req.body;
  if (typeof title !== "string") {
    console.error(new Error("video title은 string이어야합니다!"));
    return res.redirect("/videos/upload");
  }
  const newVideo = {
    id: videos.length + 1,
    title,
    likes: 0,
    comments: 0,
    createdAt: "1분",
    views: 0,
  };
  videos.push(newVideo);
  return res.redirect("/");
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "업로드" });
};

export const getVideo = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id === parseInt(id, 10));
  if (video) {
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
  } else {
    return res.redirect("/");
  }
};

export const updateVideo = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  const idx = videos.findIndex((video) => video.id === parseInt(id, 10));

  if (idx === -1) {
    console.error(new Error("video가 존재하지 않습니다."));
    return res.redirect("/");
  }

  if (typeof title !== "string") {
    console.error(new Error("video title은 string이어야합니다!"));
    return res.redirect(`/videos/${id}/edit`);
  }

  videos[idx].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id === parseInt(id, 10));
  if (video) {
    return res.render("edit", { pageTitle: `수정중 ${video.title}`, video });
  } else {
    return res.redirect("/");
  }
};

export const search = (req, res) => res.send("Searching by...");
export const remove = (req, res) => res.send("해당 비디오를 삭제합니다.");
