const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");

const { logIn, createUser } = require("../controllers/user");
const NotFoundError = require("../utils/errors/NotFoundError");
const {
  validateURL,
  validateClothingItem,
  validateUser,
  validateLogin,
  validateId,
  validateUpdateCurrentUser,
} = require("../middlewares/validation");

router.post("/signin", validateLogin, logIn);
router.post("/signup", validateUser, createUser);

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
