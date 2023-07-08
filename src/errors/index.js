import { MulterError } from "multer";

const multerErrorMessageMap = {
  LIMIT_FILE_SIZE: "파일 크기가 너무 큽니다.",
  // 다른 코드와 해당하는 메시지 추가
};

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

export class CustomMulterError extends MulterError {
  constructor(error, view = "errorView") {
    super(error.code);
    this.name = "CustomMulterError";
    this.view = view;
    this.status = error.code === "LIMIT_FILE_SIZE" ? 413 : 500;
    this.message = this.resolveErrorMessage(error.code);
  }

  resolveErrorMessage(code) {
    const defaultErrorMessage = "파일 업로드에 실패했습니다.";
    const customMessage = multerErrorMessageMap && multerErrorMessageMap[code];
    return customMessage || defaultErrorMessage;
  }
}
