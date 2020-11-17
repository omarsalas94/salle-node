const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    lastName: String,
    age: Number,
}, {
    collection: 'UserCollection'
});

module.exports = mongoose.model('User', User);