"use strict";

var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst").then(function () {
  console.log("mongodb connected");
})["catch"](function () {
  console.log("failed to connect");
});
var LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var collection = new mongoose.model("Collection1", LogInSchema);
module.exports = collection;