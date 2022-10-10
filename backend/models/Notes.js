const mongoose = require ('mongoose')

const noteSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Note', noteSchema)