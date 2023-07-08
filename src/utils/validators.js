import { ValidationError } from "../errors";

export const isValidVideoData = (title, description, hashtags, file = null) => {
  if (
    typeof title !== "string" ||
    title.length > 80 ||
    typeof description !== "string" ||
    description.length > 140 ||
    typeof hashtags !== "string" ||
    !file
  ) {
    return false;
  }
  return true;
};

export const isValidSignupData = (
  email,
  username,
  password,
  password2,
  name,
  location
) => {
  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof password2 !== "string" ||
    typeof name !== "string" ||
    typeof location !== "string"
  ) {
    return false;
  }
  return true;
};

export const isValidProfileData = (email, username, name, location) => {
  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof name !== "string" ||
    typeof location !== "string"
  ) {
    return false;
  }
  return true;
};

export const isValidChangePasswordData = (
  oldPassword,
  newPassword,
  newPassword2
) => {
  if (
    typeof oldPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof newPassword2 !== "string"
  ) {
    return false;
  }
  return true;
};

export const arePasswordsEqual = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return false;
  }
  return true;
};

export const isValidLoginData = (username, password) => {
  if (!username || !password) {
    return false;
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return false;
  }
  return true;
};

export const isValidGithubEmailData = (emailData) => {
  const emailObj = emailData.find(
    (email) => email.primary === true && email.verified === true
  );

  if (emailObj) {
    return emailObj.email;
  } else {
    throw new ValidationError(
      "이메일이 잘못되었거나 확인되지 않았습니다. GitHub 계정 설정을 확인해 주세요.",
      "login"
    );
  }
};

export const isValidKakaoEmailData = (emailData) => {
  const { is_email_valid, is_email_verified, email } = emailData;

  if (is_email_valid && is_email_verified) {
    return email;
  } else {
    throw new ValidationError(
      "이메일이 잘못되었거나 확인되지 않았습니다. Kakao 계정 설정을 확인해 주세요.",
      "login"
    );
  }
};
