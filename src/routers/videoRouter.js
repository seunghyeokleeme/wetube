import express from "express";
import { edit, watch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id", watch);

export default videoRouter;
