import express from "express";
import { edit, remove, upload, see } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", remove);
videoRouter.get("/upload", upload);

export default videoRouter;
