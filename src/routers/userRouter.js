import express from "express";
import {
  getEdit,
  getProfile,
  postUser,
  remove,
  updateProfile,
} from "../controllers/userController";
import {
  finishGithubLogin,
  finishKakaoLogin,
  getChangePassword,
  logout,
  startGithubLogin,
  startKakaoLogin,
  updatePassword,
} from "../controllers/authController";
import { privateOnly, publicOnly, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").all(publicOnly).post(postUser);
userRouter.post("/logout", privateOnly, logout);
userRouter.get("/edit", privateOnly, getEdit);
userRouter
  .route("/change-password")
  .all(privateOnly)
  .get(getChangePassword)
  .patch(updatePassword);
userRouter.get("/remove", privateOnly, remove);
userRouter.get("/github/start", publicOnly, startGithubLogin);
userRouter.get("/github/finish", publicOnly, finishGithubLogin);
userRouter.get("/kakao/start", publicOnly, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnly, finishKakaoLogin);
userRouter
  .route("/:id([0-9a-f]{24})")
  .get(getProfile)
  .patch(privateOnly, uploadFiles.single("avatar"), updateProfile);

export default userRouter;
