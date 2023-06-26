const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    blogName: String,
    author:String,
    blogImage: String,
    description:String,
    blogImageList: Array
}, {
    timestamps: true,
});

module.exports = mongoose.model("blogs", Product);