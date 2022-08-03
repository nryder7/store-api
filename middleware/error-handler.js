const { CustomError } = require("../utils/error-handler");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(404).json({ success: false, msg: `resource not found` });
};

module.exports = errorHandler;
