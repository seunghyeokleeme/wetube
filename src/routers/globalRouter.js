import express from "express";

const globalRouter = express.Router();

const home = (req, res) => res.send("Home");

globalRouter.get("/", home);

export default globalRouter;
