const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const userPost = new Schema({
    postCategoryName: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
        trim: true,
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model( "post", userPost );
