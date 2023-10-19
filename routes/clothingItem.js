const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Read
router.get("/", getItems);

router.use(auth);

// Create
router.post("/", validateClothingItem, createItem);

// Update
// router.put("/:itemId", updateItem);
router.put("/:itemId/likes", validateId, likeItem);
// Delete
router.delete("/:itemId", validateId, deleteItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
