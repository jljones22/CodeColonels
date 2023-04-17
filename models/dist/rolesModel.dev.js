"use strict";

var mongoose = require("mongoose");

var Role = mongoose.model("Role", new mongoose.Schema({
  name: String
}));
module.exports = Role;