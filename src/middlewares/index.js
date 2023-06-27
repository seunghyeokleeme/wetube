import { NotFoundError, ValidationError } from "../errors";

export const handleNotFound = (req, res, next) => {
  const error = new NotFoundError(`Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err instanceof ValidationError) {
    return res.status(400).render("400");
  }

  if (err instanceof NotFoundError) {
    return res.status(404).render("404");
  }

  return res.status(err.status || 500).render("500");
};
