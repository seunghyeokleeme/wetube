import express from "express";
import {
  edit,
  getVideo,
  putVideo,
  remove,
  upload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", getVideo);
videoRouter.put("/:id(\\d+)", putVideo);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", remove);
videoRouter.get("/upload", upload);

export default videoRouter;
