const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Root', 'Admin', 'Service Provider'],
        required: true
    }
})

UserSchema.methods.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
UserSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password)

module.exports = {
    UserCollection: new mongoose.model('users', UserSchema),
    RegistrationReqCollection: new mongoose.model('registration-request', UserSchema),
}