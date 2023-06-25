export const video = (data) => {
  const { title, description, hashtags } = data;
  return {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) =>
        word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`
      ),
  };
};
