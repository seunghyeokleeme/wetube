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

export const isValidUserData = (email, username, name, location) => {
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
