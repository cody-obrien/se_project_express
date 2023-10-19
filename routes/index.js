const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");

const { logIn, createUser } = require("../controllers/user");
const NotFoundError = require("../utils/errors/NotFoundError");
const { validateUser, validateLogin } = require("../middlewares/validation");

router.post("/signin", validateLogin, logIn);
router.post("/signup", validateUser, createUser);

router.use("/users", user);
router.use("/items", clothingItem);

router.use((next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
