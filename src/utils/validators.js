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

export const isValidUserData = (
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

export const isEqualPassword = (password1, password2) => {
  if (password1 !== password2) {
    return false;
  }
  return true;
};
