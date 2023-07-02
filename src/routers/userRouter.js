import express from "express";
import {
  edit,
  finishGithubLogin,
  finishKakaoLogin,
  getProfile,
  postUser,
  remove,
  startGithubLogin,
  startKakaoLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
userRouter.get("/:id(\\d+)", getProfile);

export default userRouter;
