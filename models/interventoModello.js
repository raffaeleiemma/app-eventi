const mongoose = require("mongoose");
const slugify = require("slugify");

const interventoSchema = new mongoose.Schema({});

const Intervento = mongoose.model("Intervento", interventoSchema);

module.exports = Intervento;
