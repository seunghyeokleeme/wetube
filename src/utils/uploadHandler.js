import { MulterError } from "multer";
import { determineView } from "./determineView";
import { CustomMulterError } from "../errors";

export const handleUpload = (uploadInstance, fieldName) => {
  return (req, res, next) => {
    const view = determineView(req.originalUrl);

    uploadInstance.single(fieldName)(req, res, (error) => {
      if (error instanceof MulterError) {
        const customMulterError = new CustomMulterError(error, view);
        next(customMulterError);
      } else {
        next(error);
      }
    });
  };
};
