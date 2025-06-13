const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  indirizzo: String,
  città: String,
  provincia: String,
  cap: String,
  stato: { type: String, default: "Italia" },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
