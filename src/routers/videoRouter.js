import express from "express";
import {
  getEdit,
  getUpload,
  getVideo,
  handleVideoUpload,
  postVideo,
  removeVideo,
  updateVideo,
} from "../controllers/videoController";
import { privateOnly } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/").post(privateOnly, handleVideoUpload, postVideo);
videoRouter.get("/upload", privateOnly, getUpload);
videoRouter
  .route("/:id([0-9a-f]{24})")
  .get(getVideo)
  .put(privateOnly, handleVideoUpload, updateVideo)
  .delete(privateOnly, removeVideo);
videoRouter.get("/:id([0-9a-f]{24})/edit", privateOnly, getEdit);

export default videoRouter;
