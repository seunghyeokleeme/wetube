export const determineView = (url) => {
  if (url.includes("/videos")) {
    return "upload";
  } else if (url.includes("/users")) {
    return "edit-profile";
  }
  return "500";
};
