import express from "express";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/logout").get(logout);
globalRouter.get("/search", search);

export default globalRouter;
