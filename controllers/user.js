const User = require("../models/user");
const handleError = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.init().then(() => {
    User.create({ name, avatar, email, password })
      .then((user) => {
        res.status(200).send({ user });
      })
      .catch((err) => {
        handleError(req, res, err);
      });
  });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = { createUser, getUsers, getUser };
