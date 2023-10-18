const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils/constants");
const User = require("../models/user");
const handleError = require("../utils/config");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("A User with this email already exists");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(200).send({ userData });
    })
    .catch((err) => {
      if (err.name === "ConflictError") {
        next(err);
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });

  // original code before centralized error handling
  // bcrypt
  //   .hash(password, 10)
  //   .then((hash) =>
  //     User.create({ name, avatar, email, password: hash })
  //       .then((user) => {
  //         const userData = user.toObject();
  //         delete userData.password;
  //         res.status(200).send({ userData });
  //       })
  //       .catch((err) => {
  //         handleError(req, res, err);
  //       }),
  //   )
  //   .catch((err) => {
  //     handleError(req, res, err);
  //   });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError("User not found"))
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      // handleError(req, res, err);
      next(err);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError("User not found"))
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Data"));
      }
      // handleError(req, res, err);
      next(err);
    });
};

const logIn = (req, res) => {
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      // handleError(req, res, err);
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

module.exports = { createUser, updateCurrentUser, getCurrentUser, logIn };
