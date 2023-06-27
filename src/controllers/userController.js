export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};

export const postUser = async (req, res) => {
  // ToDo: postUser
  console.log(req.body);
  return res.send("/users post 요쳥");
};

//
export const getProfile = (req, res) => res.send("00 회원 정보 페이지입니다.");

export const edit = (req, res) => res.send("회원 정보 수정페이지입니다.");
export const login = (req, res) => res.send("Login 페이지입니다.");
export const remove = (req, res) => res.send("회원 정보 탈퇴페이지입니다.");
