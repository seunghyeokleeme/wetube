import { UnauthorizedError, ValidationError } from "../errors";
import { AuthService, UserService } from "../services";
import {
  arePasswordsEqual,
  isValidLoginData,
  isValidSignupData,
} from "../utils/validators";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};

export const postUser = async (req, res, next) => {
  const { email, username, password, password2, name, location } = req.body;

  try {
    if (
      !isValidSignupData(email, username, password, password2, name, location)
    ) {
      throw new ValidationError("유효하지 않는 user 데이터입니다.", "join");
    }

    if (!arePasswordsEqual(password, password2)) {
      throw new ValidationError("비밀번호가 일치하지 않습니다.", "join");
    }
    const user = await UserService.existsUser(
      { $or: [{ username }, { email }] },
      true
    );
    if (user) {
      throw new ValidationError(
        "이미 존재하는 유저 이름 또는 이메일입니다.",
        "join"
      );
    }
    await UserService.registerUser({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });

export const postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!isValidLoginData(username, password)) {
      throw new ValidationError("유효하지 않는 login 데이터입니다", "login");
    }
    const user = await UserService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedError("잘못된 사용자 이름 또는 비밀번호.", "login");
    }
    await UserService.loginUser(user, password);
    req.session.loggedIn = true;
    req.session.user = user.toSafeObject();
    // Cookie 작업
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const startGithubLogin = (req, res, next) => {
  try {
    const finalUrl = AuthService.getLoginUrl("github");
    return res.redirect(finalUrl);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => res.send("logout");

export const getProfile = (req, res) => res.send("00 회원 정보 페이지입니다.");
export const edit = (req, res) => res.send("회원 정보 수정페이지입니다.");
export const remove = (req, res) => res.send("회원 정보 탈퇴페이지입니다.");
