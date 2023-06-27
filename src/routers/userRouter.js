import express from "express";
import {
  edit,
  getProfile,
  postUser,
  remove,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.get("/:id(\\d+)", getProfile);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;
