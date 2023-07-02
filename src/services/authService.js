import { ValidationError } from "../errors";

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

export const getAccessTokenURL = (snsType, code) => {
  const snsConfig = snsConfigurations[snsType];
  if (!snsConfig) {
    throw new ValidationError("알 수 없는 SNS Type입니다.", "login");
  }
  const tokenParameters = { ...snsConfig.tokenParameters, code };
  const params = new URLSearchParams(tokenParameters).toString();
  const tokenURL = `${snsConfig.tokenURL}?${params}`;

  return tokenURL;
};
