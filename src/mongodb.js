const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://client-access:4pnVVFDmaCrZ9Hok@cluster.u2fc0fu.mongodb.net/sarst")
.then(() => {
    console.log("mongodb connected")
})
.catch(() => {
    console.log("failed to connect")
})

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection1", LogInSchema)

module.exports = collection