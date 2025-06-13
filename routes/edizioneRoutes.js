const express = require("express");
const {
  checkEventoEsiste,
  setEventoUserIds,
  getAllEdizioni,
  getEdizione,
  createEdizione,
  updateEdizione,
  deleteEdizione,
} = require("../controllers/edizioneController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(restrictTo("admin"));
router.get("/tutte-le-edizioni", getAllEdizioni);
router
  .route("/")
  .get(setEventoUserIds, checkEventoEsiste, getAllEdizioni)
  .post(setEventoUserIds, checkEventoEsiste, createEdizione);

router
  .route("/:id")
  .get(setEventoUserIds, checkEventoEsiste, getEdizione)
  .patch(setEventoUserIds, checkEventoEsiste, updateEdizione)
  .delete(setEventoUserIds, checkEventoEsiste, deleteEdizione);

module.exports = router;
