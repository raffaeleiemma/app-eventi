const express = require("express");
const {
  getMe,
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");
const {
  signup,
  login,

  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("./../controllers/authController");

const router = express.Router();

// router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo("admin"));

router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
// router.patch("/updateMe", updateMe);
// router.delete("/deleteMe", deleteMe);

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
