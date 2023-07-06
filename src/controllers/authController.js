import { UnauthorizedError, ValidationError } from "../errors";
import { AuthService, UserService } from "../services";
import { fetchFromGithub } from "../utils/githubAPI";
import { fetchFromKakao } from "../utils/kakaoAPI";
import {
  arePasswordsEqual,
  isValidChangePasswordData,
  isValidKakaoEmailData,
  isValidLoginData,
} from "../utils/validators";

export const postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!isValidLoginData(username, password)) {
      throw new ValidationError("유효하지 않는 login 데이터입니다", "login");
    }
    const user = await UserService.getUserByUsername(username, {
      socialOnly: false,
    });
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

    let user = await UserService.getUserByEmail(emailObj.email);
    if (!user) {
      const { id: githubId, name, location, avatar_url: avatarUrl } = userData;
      user = await UserService.registerUser(
        {
          email: emailObj.email,
          username: String("g" + githubId),
          avatarUrl,
          name: name ?? "",
          password: "",
          location: location ?? "",
        },
        true
      );
    }
    req.session.loggedIn = true;
    req.session.user = user.toSafeObject();
    return res.redirect("/");
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

    let user = await UserService.getUserByEmail(email);
    if (!user) {
      const {
        id: kakaoId,
        kakao_account: {
          profile: { nickname, profile_image_url },
        },
      } = userData;

      user = await UserService.registerUser(
        {
          email,
          username: String("k" + kakaoId),
          name: nickname,
          avatarUrl: profile_image_url,
          password: "",
        },
        true
      );
    }
    req.session.loggedIn = true;
    req.session.user = user.toSafeObject();
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const getChangePassword = (req, res) => {
  return res.render("change-password", { pageTitle: "비밀번호 변경" });
};

export const updatePassword = async (req, res, next) => {
  const {
    body: { oldPassword, newPassword, newPasswordConfirm },
    session: {
      user: { _id },
    },
  } = req;

  try {
    if (
      !isValidChangePasswordData(oldPassword, newPassword, newPasswordConfirm)
    ) {
      throw new ValidationError(
        "유효하지 않는 비밀번호 변경 데이터입니다.",
        "change-password"
      );
    }

    if (!arePasswordsEqual(newPassword, newPasswordConfirm)) {
      throw new ValidationError(
        "새 비밀번호가 일치하지 않습니다.",
        "change-password"
      );
    }

    await AuthService.changePassword(_id, oldPassword, newPassword);
    await req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await req.session.destroy();
    return res.status(200).json({ message: "Logged out." });
  } catch (error) {
    next(error);
  }
};
