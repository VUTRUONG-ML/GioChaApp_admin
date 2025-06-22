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
    isAdmin:{
        type: Boolean,
        default: false,
    }
    
});

module.exports = mongoose.model('User', userSchema);