"use strict";

var express = require('express');

var mongoose = require('mongoose');

var passport = require('passport');

var bodyParser = require('body-parser');

var LocalStrategy = require('passport-local');

var passportLocalMongoose = require('passport-local-mongoose');

var User = require('./models/userModel');

var app = express();

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require("express-session")({
  secret: '5B1t8yzN%r*AN8&f@%YJO$53@B0t$a',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // use static authenticate method of model in LocalStrategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'passwd',
  session: false
}, User.createStrategy())); // use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); // ROUTES
// Showing home page

app.get("/", function (req, res) {
  res.render('register', {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''
  });
}); // Showing secret page

app.get("/home", isLoggedIn, function (req, res) {
  res.render("home");
}); // Showing register form

app.get("/register", function (req, res) {
  res.render('register', {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''
  });
}); // Handling user signup

app.post("/register", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.register(new User({
    email: email
  }), password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }

    passport.authenticate("local")(req, res, function () {
      req.flash('success', 'You have logged in');
      res.render("home");
    });
  });
}); //Showing login form

app.get("/login", function (req, res) {
  res.render('login', {
    title: 'Login',
    email: '',
    password: ''
  });
}); //Handling user login

app.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login"
}), function (req, res) {}); //Handling user logout

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});