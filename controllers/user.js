const User = require("../models/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: "createUser failed", err });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: "getUsers failed", err });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: "getUser failed", err });
    });
};

module.exports = { createUser, getUsers, getUser };
