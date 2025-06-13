const mongoose = require("mongoose");
const slugify = require("slugify");

const relatoreSchema = new mongoose.Schema({});

const Relatore = mongoose.model("Relatore", relatoreSchema);

module.exports = Relatore;
