const mongoose = require("mongoose");
const path = require('path');
const Post = mongoose.model("post");
require('dotenv').config();

exports.createCategoryImages = async (req, res) => {
    try {
        let file = req.files;
        const {body} = req;
        const {categoryName} = body;

        if (!categoryName) {
            return res.status(400).send({message: "category Name is required!", success: false})
        }

        if (file.length) {
            let imageArray = [];
            file.forEach((item, index) => {
                const extname = path.extname(item.originalname);
                let filename = `/uploads/post/${item.originalname}`;
                if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                    imageArray.push(filename)
                } else {
                    imageArray.push("")
                }
            });
            const isCreated = await Post.create({postCategoryName: categoryName, images: imageArray});
            if (isCreated) {
                res.status(200).send({message: "successFully created", success: true})
            } else {
                res.status(400).send({message: "something Went Wrong", success: false})
            }
        } else {
            return res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.deleteCategoryImages = async (req, res) => {
    try {
        const isDeleted = await Post.deleteOne({_id: req.params.id});
        if (isDeleted) {
            res.status(200).send({message: "successFully deleted", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getPostImages = async (req, res) => {
    try {
        let query = {};
        const application = await Post.find(query).lean();
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};
