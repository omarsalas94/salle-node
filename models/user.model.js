const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function(value) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (value && value.includes('@')) {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    }, 500);
                });
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: [80, 'Edad no puede ser mayor a 80'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    password: {
        type: String,
        required: true
    },
    role: String,
}, {
    collection: 'UserCollection',
    strict: true
});

module.exports = mongoose.model('User', User);