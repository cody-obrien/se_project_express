const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");
const { ERROR_404 } = require("../utils/errors");
const { logIn, createUser } = require("../controllers/user");

router.post("/signin", logIn);
router.post("/signup", createUser);

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

module.exports = router;
