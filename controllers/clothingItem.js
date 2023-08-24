const ClothingItem = require("../models/clothingItem");
const handleError = require("../utils/config");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const userId = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail()
//     .then((item) => {
//       res.status(200).send({ item });
//     })
//     .catch((err) => {
//       handleError(req, res, err);
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return Promise.reject(new Error("Cannot delete another user's item"));
      }
      ClothingItem.findByIdAndDelete(item._id).then(() => {
        res.status(200).send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      handleError(req, res, err);
    });

  // ClothingItem.findByIdAndDelete(itemId)
  //   .orFail()
  //   .then((item) => {
  //     res.status(200).send({ item });
  //   })
  //   .catch((err) => {
  //     handleError(req, res, err);
  //   });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
