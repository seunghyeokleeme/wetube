import { UserService } from ".";
import { UnauthorizedError, ValidationError } from "../errors";
import fetch from "node-fetch";

const snsConfigurations = {
  github: {
    authURL: "https://github.com/login/oauth/authorize",
    tokenURL: "https://github.com/login/oauth/access_token",
    authParameters: {
      client_id: process.env.GH_CLIENT,
      allow_signup: false,
      scope: "read:user user:email",
    },
    tokenParameters: {
      client_id: process.env.GH_CLIENT,
      client_secret: process.env.GH_SECRET,
    },
  },
  kakao: {
    authURL: "https://kauth.kakao.com/oauth/authorize",
    tokenURL: "https://kauth.kakao.com/oauth/token",
    authParameters: {
      client_id: process.env.KAKAO_CLIENT,
      redirect_uri: process.env.KAKAO_REDIRECT,
      response_type: "code",
      scope: "account_email,profile_image,profile_nickname",
    },
    tokenParameters: {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT,
      redirect_uri: process.env.KAKAO_REDIRECT,
      client_secret: process.env.KAKAO_SECRET,
    },
  },
};

export const getAuthorizationURL = (snsType) => {
  const snsConfig = snsConfigurations[snsType];

  if (!snsConfig) {
    throw new ValidationError("알 수 없는 SNS Type입니다.", "login");
  }

  const params = new URLSearchParams(snsConfig.authParameters).toString();
  const authURL = `${snsConfig.authURL}?${params}`;

  return authURL;
};

export const getAccessToken = async (snsType, code) => {
  const snsConfig = snsConfigurations[snsType];
  if (!snsConfig) {
    throw new ValidationError("알 수 없는 SNS Type입니다.", "login");
  }

  const tokenParameters = { ...snsConfig.tokenParameters, code };

  const tokenResponse = await fetch(snsConfig.tokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams(tokenParameters).toString(),
  });

  if (!tokenResponse.ok) {
    throw new UnauthorizedError(
      `${snsType}에서 토큰 발급 요청 실패 했습니다.`,
      "login"
    );
  }

  return await tokenResponse.json();
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await UserService.getUserById(userId);
  await UserService.verifyPassword(
    oldPassword,
    user.password,
    "change-password"
  );
  user.password = newPassword;
  await user.save();
};
