const {
  ERROR_400,
  ERROR_401,
  ERROR_404,
  ERROR_409,
  ERROR_500,
} = require("./errors");

const handleError = (req, res, error) => {
  console.error(error);
  if (error.code === 11000) {
    res
      .status(ERROR_409)
      .send({ message: "A user with that email already exists" });
  } else {
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
      case "AuthenticationError":
        res.status(ERROR_401).send({ message: "Incorrect email or password" });
      default:
        res.status(ERROR_500).send({ message: "Server encountered an error" });
    }
  }
};

module.exports = handleError;
