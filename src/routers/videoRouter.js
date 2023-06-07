import express from "express";

const videoRouter = express.Router();

const watch = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", watch);

export default videoRouter;
