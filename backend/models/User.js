const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true, 
        unique: true
    },
    email: {
        type: String, 
        require: true, 
        unique: true,
        match: /.+\@.+\..+/,
    },
    passWord:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        match: /^[0-9]{10,11}$/
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
    
});

module.exports = mongoose.model('User', userSchema);