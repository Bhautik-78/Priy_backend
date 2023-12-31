const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const userOrder = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    subCategory: {type: Schema.Types.ObjectId, ref: 'subCategory'},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    customerName: String,
    orderDetail: String,
    orderQuantity: Number,
    mobileNumber: String,
    orderStatus: {
        type: String,
        default: "pending"
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model( "order", userOrder );
