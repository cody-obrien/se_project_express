const { ERROR_400, ERROR_404, ERROR_500 } = require("./errors");

const handleError = (req, res, error) => {
  console.error(error);
  switch (error.name) {
    case "ValidationError":
      res.status(ERROR_400).send({ message: "Validation failed" });
      break;
    case "CastError":
      res.status(ERROR_400).send({ message: "Could not cast parameters" });
      break;
    case "DocumentNotFoundError":
      res.status(ERROR_404).send({ message: "Resource not found" });
      break;
    default:
      res.status(ERROR_500).send({ message: "Server encountered an error" });
  }
};

module.exports = handleError;
