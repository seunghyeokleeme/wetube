import fetch from "node-fetch";
import { isValidLoginData } from "../utils/validators";
import { UnauthorizedError, ValidationError } from "../errors";
import { AuthService, UserService } from "../services";

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
    const finalUrl = AuthService.getAccessTokenURL("github", code);
    const tokenResponse = await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!tokenResponse.ok) {
      throw new UnauthorizedError(
        "GitHub에서 엑세스 토큰을 검색할 수 없습니다.",
        "login"
      );
    }

    const tokenRequest = await tokenResponse.json();
    const { access_token } = tokenRequest;
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
          username: String(githubId),
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

export const logout = (req, res) => res.send("logout");
