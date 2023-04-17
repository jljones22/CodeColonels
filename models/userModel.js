const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// create an schema
const User = new Schema({
    name: String,
    password: String,
    email: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);