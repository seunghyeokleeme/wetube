import { ValidationError } from "../errors";

export const isValidVideoData = (title, description, hashtags) => {
  if (
    typeof title !== "string" ||
    title.length > 80 ||
    typeof description !== "string" ||
    description.length > 140 ||
    typeof hashtags !== "string"
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

export const arePasswordsEqual = (password1, password2) => {
  if (password1 !== password2) {
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

export const isValidKakaoEmailData = (emailData) => {
  const { has_email, is_email_valid, is_email_verified, email } = emailData;

  if (has_email && is_email_valid && is_email_verified) {
    return email;
  } else {
    throw new ValidationError("이메일이 잘못되었거나 확인되지 않았습니다.");
  }
};
