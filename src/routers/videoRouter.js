import express from "express";
import {
  getEdit,
  getUpload,
  getVideo,
  postVideo,
  remove,
  updateVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.post("/", postVideo);
videoRouter.get("/upload", getUpload);
videoRouter.route("/:id(\\d+)").get(getVideo).patch(updateVideo);
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.get("/:id(\\d+)/delete", remove);

export default videoRouter;
