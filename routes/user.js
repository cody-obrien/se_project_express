const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateURL,
  validateClothingItem,
  validateUser,
  validateLogin,
  validateId,
  validateUpdateCurrentUser,
} = require("../middlewares/validation");

const {
  updateCurrentUser,
  getCurrentUser,
  createUser,
  logIn,
} = require("../controllers/user");

// Create

router.use(auth);
// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", validateUpdateCurrentUser, updateCurrentUser);
module.exports = router;
