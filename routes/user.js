const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUpdateCurrentUser } = require("../middlewares/validation");

const { updateCurrentUser, getCurrentUser } = require("../controllers/user");

// Create

router.use(auth);
// Read
router.get("/me", getCurrentUser);

// Update
router.patch("/me", validateUpdateCurrentUser, updateCurrentUser);
module.exports = router;
