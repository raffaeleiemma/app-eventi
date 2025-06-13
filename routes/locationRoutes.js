const express = require("express");

const {
  getAllLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("./../controllers/locationController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router
  .route("/")
  .get(getAllLocations)
  .post(createLocation);

router
  .route("/:id")
  .get(getLocation)
  .patch(updateLocation)
  .delete(deleteLocation);

module.exports = router;
