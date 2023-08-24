const router = require("express").Router();
const auth = require("../middlewares/auth");

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
router.post("/", createItem);

// Update
// router.put("/:itemId", updateItem);
router.put("/:itemId/likes", likeItem);
// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
