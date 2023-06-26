import { NotFoundError, ValidationError } from "../errors";

export function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (err instanceof ValidationError) {
    return res.status(400).render("400");
  }

  if (err instanceof NotFoundError) {
    return res.status(404).render("400");
  }

  return res.status(err.status || 500).render("500");
}
