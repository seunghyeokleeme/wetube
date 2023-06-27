import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, join, login } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
