const logger = require("./logger");

const errorHandler = (error, req, res, next) => {
  if (error.code) {
    res.status(error.code).json({ message: error.message });
    return;
  }

  const errorMessage = `Path: ${req.path}, ${error.toString()}`;
  logger.error(errorMessage);
  res.status(500).json({ message: error.toString(), path: req.path });
};

module.exports = errorHandler;
