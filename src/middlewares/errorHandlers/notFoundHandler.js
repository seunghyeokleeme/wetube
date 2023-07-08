import { NotFoundError } from "../../errors";

export const handleNotFound = (req, res, next) => {
  const error = new NotFoundError(`Not Found - ${req.originalUrl}`);
  next(error);
};
