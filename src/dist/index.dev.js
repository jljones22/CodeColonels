"use strict";

var express = require('express');

var app = express();

var path = require('path');

var hbs = require('hbs');

var collection = require('./mongodb');

var templatePath = path.join(__dirname, '../templates');
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.render('login');
});
app.get('/signup', function (req, res) {
  res.render('signup');
});
app.post('/signup', function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = {
            name: req.body.name,
            // req.body is how you get user value
            password: req.body.password
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(collection.insertMany([data]));

        case 3:
          res.render('home');

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/login', function _callee2(req, res) {
  var check;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(collection.findOne({
            name: req.body.name
          }));

        case 3:
          check = _context2.sent;

          if (check.password === req.body.password) {
            res.render('home');
          } else {
            res.send("wrong password");
          }

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.send("wrong details");

        case 10:
          res.render('home');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.listen(3000, function () {
  console.log('port connected');
});