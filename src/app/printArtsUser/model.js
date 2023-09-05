const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const User = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmailId: {
        type: String,
        required: true
    },
    userMobileNumber: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userOtp: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model( "PrintArtUser", User );