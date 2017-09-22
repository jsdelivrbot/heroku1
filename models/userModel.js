var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({

    email: String,
    pass: String,
    name: String,
    admin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userModel);