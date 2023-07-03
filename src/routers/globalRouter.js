import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin } from "../controllers/userController";
import { postLogin } from "../controllers/authController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
