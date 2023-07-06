import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin, postLogin } from "../controllers/authController";
import { publicOnly } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").all(publicOnly).get(getJoin);
globalRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
