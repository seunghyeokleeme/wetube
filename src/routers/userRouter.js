import express from "express";
import {
  edit,
  finishGithubLogin,
  getProfile,
  postUser,
  remove,
  startGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id(\\d+)", getProfile);

export default userRouter;
