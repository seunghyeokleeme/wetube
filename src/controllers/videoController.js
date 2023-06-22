export const trending = (req, res) => res.send("Home");
export const edit = (req, res) => res.send("Edit Video");
export const see = (req, res) => {
  const { id } = req.params;
  return res.send(`${id}번 video 페이지입니다.`);
};
export const search = (req, res) => res.send("Searching by...");
export const remove = (req, res) => res.send("해당 비디오를 삭제합니다.");
export const upload = (req, res) => res.send("비디오 업로드 페이지입니다.");
