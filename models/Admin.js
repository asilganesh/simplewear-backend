const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'admin'
    }
})

module.exports = mongoose.model('Admin',adminSchema)