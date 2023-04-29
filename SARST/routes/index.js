const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const passport = require('passport')

const csrfProtection = csrf()
router.use(csrfProtection)

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

const notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
router.get('/user/profile', isLoggedIn, (req, res) => {
  res.render('user/profile')
})

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/')
})

router.use('/', notLoggedIn, (req, res, next) => {
  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/user/signin', (req, res) => {
  const messages = req.flash('error')
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

router.get('/user/signup', (req, res) => {
  const messages = req.flash('error')
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

module.exports = router;
