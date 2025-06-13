const mongoose = require("mongoose");
const Edizione = require("./../models/edizioneModello");
const Evento = require("./../models/eventoModello");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.checkEventoEsiste = catchAsync(async (req, res, next) => {
  const evento = await Evento.findById(req.body.evento);
  if (!evento) {
    return res
      .status(404)
      .json({ status: "fail", message: "Evento inesistente" });
  }
  next();
});

exports.setEventoUserIds = (req, res, next) => {
  if (!req.body.evento) req.body.evento = req.params.eventoId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllEdizioni = factory.getAll(Edizione);
exports.getEdizione = factory.getOne(Edizione);
exports.createEdizione = factory.createOne(Edizione);
exports.updateEdizione = factory.updateOne(Edizione);
exports.deleteEdizione = factory.deleteOne(Edizione);
