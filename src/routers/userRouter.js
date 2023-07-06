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
  logout,
  startGithubLogin,
  startKakaoLogin,
} from "../controllers/authController";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.post("/logout", logout);
userRouter.get("/edit", getEdit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
userRouter.route("/:id([0-9a-f]{24})").get(getProfile).patch(updateProfile);

export default userRouter;
