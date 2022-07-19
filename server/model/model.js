const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String,
    phone : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;