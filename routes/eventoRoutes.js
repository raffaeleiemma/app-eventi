const express = require("express");

const {
  getAllEventi,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
} = require("./../controllers/eventoController");
const { protect, restrictTo } = require("./../controllers/authController");
const edizioneRouter = require("./edizioneRoutes");

const router = express.Router();

// Middleware che verranno applicati a tutte le rotte di questo router
router.use(protect); // Protegge tutte le rotte successive
router.use(restrictTo("admin")); // Limita l'accesso alle rotte successive agli utenti con il ruolo "admin"

// Le tue rotte
router
  .route("/")
  .get(getAllEventi)
  .post(createEvento);

router
  .route("/:id")
  .get(getEvento)
  .patch(updateEvento)
  .delete(deleteEvento);

router.use("/:eventoId/edizioni", edizioneRouter);
module.exports = router;
