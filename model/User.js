const mangoose = require('mongoose');

const UserSchema = new mangoose.Schema({
    username: {
        type: String,
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    profilePhoto: {
        type: String
    }
    
    
}, {timestamps: true});

module.exports = mangoose.model('User', UserSchema);