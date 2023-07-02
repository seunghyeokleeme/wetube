import { UnauthorizedError, ValidationError } from "../errors";
import { AuthService, UserService } from "../services";
import { fetchFromGithub } from "../utils/githubAPI";
import { fetchFromKakao } from "../utils/kakaoAPI";
import {
  arePasswordsEqual,
  isValidKakaoEmailData,
  isValidLoginData,
  isValidSignupData,
} from "../utils/validators";
import fetch from "node-fetch";

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
    const finalUrl = AuthService.getAuthorizationURL("github");
    return res.redirect(finalUrl);
  } catch (error) {
    next(error);
  }
};

export const finishGithubLogin = async (req, res, next) => {
  const { code } = req.query;
  try {
    const tokenData = await AuthService.getAccessToken("github", code);
    const { access_token } = tokenData;
    const apiUrl = "https://api.github.com";
    const userData = await fetchFromGithub(`${apiUrl}/user`, access_token);
    const emailData = await fetchFromGithub(
      `${apiUrl}/user/emails`,
      access_token
    );

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      throw new ValidationError(
        "이메일을 가져올 수 없습니다. GitHub 계정 설정을 확인해 주세요.",
        "login"
      );
    }

    const existingUser = await UserService.getUserByEmail(emailObj.email);
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser.toSafeObject();
      return res.redirect("/");
    } else {
      const { id: githubId, name, location } = userData;
      const user = await UserService.registerUser(
        {
          email: emailObj.email,
          username: String("g" + githubId),
          name: name ?? "",
          password: "",
          location: location ?? "",
        },
        true
      );
      req.session.loggedIn = true;
      req.session.user = user.toSafeObject();
      return res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

export const startKakaoLogin = (req, res, next) => {
  try {
    const finalUrl = AuthService.getAuthorizationURL("kakao");
    return res.redirect(finalUrl);
  } catch (error) {
    next(error);
  }
};

export const finishKakaoLogin = async (req, res, next) => {
  const { code } = req.query;
  try {
    const tokenData = await AuthService.getAccessToken("kakao", code);
    const { access_token } = tokenData;
    const userData = await fetchFromKakao(access_token, "profile");
    const emailData = await fetchFromKakao(access_token, "email");

    const email = isValidKakaoEmailData(emailData.kakao_account);

    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser.toSafeObject();
      return res.redirect("/");
    } else {
      const {
        id: kakaoId,
        kakao_account: { profile },
      } = userData;

      const user = await UserService.registerUser(
        {
          email,
          username: String("k" + kakaoId),
          name: profile.nickname ?? "",
          password: "",
        },
        true
      );
      req.session.loggedIn = true;
      req.session.user = user.toSafeObject();
      return res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => res.send("logout");

export const getProfile = (req, res) => res.send("00 회원 정보 페이지입니다.");
export const edit = (req, res) => res.send("회원 정보 수정페이지입니다.");
export const remove = (req, res) => res.send("회원 정보 탈퇴페이지입니다.");
