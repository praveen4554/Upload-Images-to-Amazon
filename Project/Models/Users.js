'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    passwordHash: String,
    passwordSalt: String,
    randomNumber: Number,
    created_at: Date,
    updated_at: Date

});

module.exports = mongoose.model('User', UserSchema);
