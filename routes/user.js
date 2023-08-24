const router = require("express").Router();

const { createUser, getUsers, getUser, logIn } = require("../controllers/user");

// Create
router.post("/", createUser);

// Read
router.get("/", getUsers);
router.get("/:userId", getUser);

router.post("/signin", logIn);

module.exports = router;
