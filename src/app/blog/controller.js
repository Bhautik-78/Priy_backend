const mongoose = require("mongoose");
const path = require('path');
const Blogs = mongoose.model("blogs");
require('dotenv').config();

exports.createBlogs = async (req, res) => {
    try {
        let file = req.file;
        if (file) {
            const extname = path.extname(file.originalname);
            let filename = `/uploads/blog/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.blogImage = filename;
            } else {
                req.body.blogImage = "";
            }
        }
        const existData = await Blogs.find({blogName: req.body.blogName});
        if (existData.length > 0) {
            res.status(200).send({message: "blogName is already exist!", success: true})
        } else {
            const isCreated = await Blogs.create(req.body);
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

exports.getBlogsByName = async (req, res) => {
    try {
        const application = await Blogs.find({blogName: req.params.blogName});
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        let query = {};
        const application = await Blogs.find(query).lean();
        application.forEach(object => {
            delete object['blogImageList'];
        });
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getBlogs = async (req, res) => {
    try {
        let query = {
            active: true
        };
        const application = await Blogs.find(query).lean();
        application.forEach(object => {
            delete object['blogImageList'];
        });
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.editBlogs = async (req, res) => {
    try {
        let file = req.file;
        if (file) {
            const extname = path.extname(file.originalname);
            let filename = `/uploads/blog/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.blogImage = filename;
            } else {
                req.body.blogImage = "";
            }
        }
        const isUpdate = await Blogs.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.deleteBlogs = async (req, res) => {
    try {
        const isDeleted = await Blogs.deleteOne({_id: req.params.id});
        if (isDeleted) {
            res.status(200).send({message: "successFully deleted", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

