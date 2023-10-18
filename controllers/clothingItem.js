const ClothingItem = require("../models/clothingItem");
const handleError = require("../utils/config");
const BadRequestError = require("../utils/errors/BadRequestError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const userId = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      // handleError(req, res, err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Data"));
      }
      next(err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      // handleError(req, res, err);
      next(err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Resource not found"))
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("Cannot delete another user's item");
      }
      ClothingItem.findByIdAndDelete(item._id)
        .orFail(new NotFoundError("Resource not found"))
        .then(() => {
          res.status(200).send({ message: "Item deleted" });
        })
        .catch((err) => {
          // handleError(req, res, err);
          next(err);
        });
    })
    .catch((err) => {
      // handleError(req, res, err);
      next(err);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => new NotFoundError("Resource not found"))
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      next(err);
      // handleError(req, res, err);
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => new NotFoundError("Resource not found"))
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      next(err);
      // handleError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
