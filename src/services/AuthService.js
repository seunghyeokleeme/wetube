import { ValidationError } from "../errors";

const SNSConfig = {
  github: {
    baseUrl: "https://github.com/login/oauth/authorize",
    config: {
      client_id: "c25822a49e162d9e12c3",
      allow_signup: false,
      scope: "read:user user:email",
    },
  },
};

export const getLoginUrl = (snsType) => {
  const snsConfig = SNSConfig[snsType];
  if (!snsConfig) {
    throw new ValidationError("알 수 없는 SNS Type입니다.", "login");
  }
  const params = new URLSearchParams(snsConfig.config).toString();
  const finalUrl = `${snsConfig.baseUrl}?${params}`;
  return finalUrl;
};
