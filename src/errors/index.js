export class ValidationError extends Error {
  constructor(message = "Bad Request", view = "errorView") {
    super(message);
    this.name = "ValidationError";
    this.view = view;
    this.status = 400;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized", view = "errorView") {
    super(message);
    this.name = "UnauthorizedError";
    this.view = view;
    this.status = 401;
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden", view = "errorView") {
    super(message);
    this.name = "ForbiddenError";
    this.view = view;
    this.status = 403;
  }
}

export class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}
