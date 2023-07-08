import multer from "multer";

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 500000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});
