"use strict";

var mongoose = require('../database');

mongoose.connect('mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst', {
  useNewUrlParser: true
});
var conn = mongoose.connection;
conn.on('connected', function () {
  console.log('Database is connected successfully.');
});
conn.on('disconnected', function () {
  console.log('Database is disconnected successfully.');
});
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;