import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors";

export const handleNotFound = (req, res, next) => {
  const error = new NotFoundError(`Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err instanceof ValidationError) {
    return res
      .status(400)
      .render(err.view, { errorMessage: err.message, pageTitle: err.view });
  }

  if (err instanceof UnauthorizedError) {
    return res
      .status(401)
      .render(err.view, { errorMessage: err.message, pageTitle: err.view });
  }

  if (err instanceof ForbiddenError) {
    return res
      .status(403)
      .render(err.view, { errorMessage: err.message, pageTitle: err.view });
  }

  if (err instanceof NotFoundError) {
    return res
      .status(404)
      .render("404", { errorMessage: err.message, pageTitle: err.view });
  }

  return res.status(err.status || 500).render("500");
};

export const locals = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Devtube";
  res.locals.loggedInUser = req.session.user;
  next();
};
