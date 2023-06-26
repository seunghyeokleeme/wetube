export const parseHashtags = (hashtags) => {
  return hashtags.split(",").map((word) => {
    const trimmedWord = word.trim();
    return trimmedWord.startsWith("#") ? trimmedWord : `#${trimmedWord}`;
  });
};
