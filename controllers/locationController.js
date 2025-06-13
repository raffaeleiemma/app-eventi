const Location = require("../models/locationModello");
const mongoose = require("mongoose");
const factory = require("./handlerFactory");

exports.getAllLocations = factory.getAll(Location);
exports.getLocation = factory.getOne(Location);
exports.createLocation = factory.createOne(Location);
exports.updateLocation = factory.updateOne(Location);
exports.deleteLocation = factory.deleteOne(Location);
