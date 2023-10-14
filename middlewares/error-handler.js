function errorHandler(err, req, res, next) {
  res.status(statusCode).send({ message });
}

module.exports = errorHandler;
