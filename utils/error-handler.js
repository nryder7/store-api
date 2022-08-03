class CustomError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
}

const customError = (msg, statusCode) => {
  return new CustomError(msg, statusCode);
};

module.exports = { customError, CustomError };
