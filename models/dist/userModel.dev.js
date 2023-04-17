"use strict";

var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // create an schema

var User = new Schema({
  name: String,
  password: String,
  email: String
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);