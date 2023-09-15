const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  updateCurrentUser,
  getCurrentUser,
  createUser,
  logIn,
} = require("../controllers/user");

// Create
router.post("/signup", createUser);
router.post("/signin", logIn);
router.use(auth);
// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", updateCurrentUser);
module.exports = router;
