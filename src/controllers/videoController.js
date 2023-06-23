let videos = [
  {
    id: 1,
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
  },
  {
    id: 2,
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
  },
  {
    id: 3,
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
  },
];
export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const see = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id === +id);
  if (video) {
    return res.render("watch", { pageTitle: `Watching ${video.title}` });
  } else {
    return res.redirect("/");
  }
};
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) => res.send("Searching by...");
export const remove = (req, res) => res.send("해당 비디오를 삭제합니다.");
export const upload = (req, res) => res.send("비디오 업로드 페이지입니다.");
