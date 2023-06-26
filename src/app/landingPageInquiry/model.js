const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const LandingInquiry = new Schema({
    userName: String,
    userMobile: String,
    userCity: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model( "LandingPageInquiry", LandingInquiry );
