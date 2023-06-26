const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    productName: String,
    categoryId: String,
    productImage: String,
    productImageList: Array
}, {
    timestamps: true,
});

module.exports = mongoose.model("products", Product);