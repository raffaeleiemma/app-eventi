const Evento = require("./../models/eventoModello");
const factory = require("./handlerFactory");

exports.getAllEventi = factory.getAll(Evento, {
  path: "edizioni",
});
exports.getEvento = factory.getOne(Evento, {
  path: "edizioni",
});
exports.createEvento = factory.createOne(Evento);
exports.updateEvento = factory.updateOne(Evento);
exports.deleteEvento = factory.deleteOne(Evento);
