const mongoose = require("mongoose");
const Inquiry = mongoose.model("LandingPageInquiry");
require('dotenv').config();

exports.createInquiry = async (req, res) => {
    try {
        const isCreated = await Inquiry.create(req.body);
        if (isCreated) {
            res.status(200).send({message: "successFully created", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getInquiry = async (req, res) => {
    try {
        let query = {};
        const application = await Inquiry.find(query).sort({createdAt: -1});
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: true});
    }
};