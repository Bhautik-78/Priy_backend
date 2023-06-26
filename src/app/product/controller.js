const mongoose = require("mongoose");
const path = require('path');
const Product = mongoose.model("products");
require('dotenv').config();

exports.createProduct = async (req, res) => {
    try {
        let file = req.file;
        if (file) {
            const extname = path.extname(file.originalname);
            let filename = `/uploads/product/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.productImage = filename;
            } else {
                req.body.productImage = "";
            }
        }
        const existData = await Product.find({productName: req.body.productName});
        if (existData.length > 0) {
            res.status(200).send({message: "productName is already exist!", success: true})
        } else {
            const isCreated = await Product.create(req.body);
            if (isCreated) {
                res.status(200).send({message: "successFully created", success: true})
            } else {
                res.status(400).send({message: "something Went Wrong", success: false})
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.updateProductWithMultiImage = async (req, res) => {
    try {
        let file = req.files;
        if (file.length) {
            let imageArray = [];
            file.forEach((item, index) => {
                const extname = path.extname(item.originalname);
                let filename = `/uploads/product/${item.originalname}`;
                if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                    imageArray.push(filename)
                } else {
                    imageArray.push("")
                }
            });
            const isCreated = await Product.updateOne({productName: req.params.productName}, {$set: {productImageList: imageArray}});
            if (isCreated) {
                res.status(200).send({message: "successFully created", success: true})
            } else {
                res.status(400).send({message: "something Went Wrong", success: false})
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getProductByName = async (req, res) => {
    try {
        const application = await Product.find({productName: req.params.productName});
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let query = {};
        const application = await Product.find(query).lean();
        application.forEach(object => {
            delete object['productImageList'];
        });
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getProduct = async (req, res) => {
    try {
        let query = {
            active: true
        };
        const application = await Product.find(query).lean();
        application.forEach(object => {
            delete object['productImageList'];
        });
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.editProduct = async (req, res) => {
    try {
        let file = req.file;
        if (file) {
            const extname = path.extname(file.originalname);
            let filename = `/uploads/product/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.productImage = filename;
            } else {
                req.body.productImage = "";
            }
        }
        const isUpdate = await Product.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const isDeleted = await Product.deleteOne({_id: req.params.id});
        if (isDeleted) {
            res.status(200).send({message: "successFully deleted", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.fetchAllImage = async (req, res) => {
    try {
        let query = {};
        const application = await Product.find(query).lean();
        const data = application.map(object => ({
            original: object.productImage,
            thumbnail: object.productImage
        }));
        res.status(200).send({data, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getMultiImageByProductName = async (req, res) => {
    try {
        const application = await Product.findOne({productName: req.params.id}).lean();
        const data = application.productImageList.map(object => ({
            original: `http://35.78.171.207:8000${object}`,
            thumbnail: `http://35.78.171.207:8000${object}`
        }));
        res.status(200).send({data, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};