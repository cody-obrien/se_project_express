const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
const { ERROR_401 } = require("../utils/errors");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const ForbiddenError = require("../utils/errors/ForbiddenError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authorization Required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    next(new UnauthorizedError("Authorization Required"));
  }

  req.user = payload;
  next();
};
