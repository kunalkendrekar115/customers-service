class CustomError extends Error {
  constructor(code = 403, message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.message = message;
  }
}

module.exports = CustomError;
