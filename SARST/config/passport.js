const passport = require('passport')
const { UserCollection } = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    await UserCollection.findById(id)
    .then((user) => {
        done(null, user)
    })
    .catch((err) => {
        done(err, user)
    })
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail()
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 })
    const errors = req.validationErrors()
    if(errors) {
        let messages = []
        errors.forEach((error) => {
            messages.push(error.msg)
        })
        return done(null, false, req.flash('error', messages))
    }

    const user = await UserCollection.findOne({ 'email': email })
    .catch((error) => {
        return done(err)
    })

    if(user) {
        return done(null, false, { message: 'Email is already in use.' })
    }
    
    const newUser = new UserCollection()
    newUser.firstName = req.body.firstName
    newUser.lastName = req.body.lastName
    newUser.email = email
    newUser.password = newUser.encryptPassword(password)
    newUser.role = req.body.roles

    const result = await newUser.save()
    .catch((err) => {
        return done(err)
    })

    if(result) {
        return done(null, newUser)
    }
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail()
    req.checkBody('password', 'Invalid password').notEmpty()
    const errors = req.validationErrors()
    if(errors) {
        let messages = []
        errors.forEach((error) => {
            messages.push(error.msg)
        })
        return done(null, false, req.flash('error', messages))
    }

    const user = await UserCollection.findOne({'email': email })
    .catch((err) => {
        return done(err)
    })

    if(!user) {
        return done(null, false, { message: 'No user found.' })
    }
    if(!user.validPassword(password)) { // does not work as expected // error message says missing data and hash arguments required
        return done(null, false, { message: 'Wrong password' })
    }
    return done(null, user)
}))