import express from "express";
import {
  getEdit,
  getUpload,
  getVideo,
  postVideo,
  remove,
  removeVideo,
  updateVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.post("/", postVideo);
videoRouter.get("/upload", getUpload);
videoRouter
  .route("/:id([0-9a-f]{24})")
  .get(getVideo)
  .put(updateVideo)
  .delete(removeVideo);
videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", remove);

export default videoRouter;
