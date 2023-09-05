const mongoose = require("mongoose");
const User = mongoose.model("PrintArtUser");
require('dotenv').config();
const cron = require('node-cron');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "hiteshwork07@gmail.com",
        pass: "ggscbtbrwbyjxsjp"
    }
});

cron.schedule('*/2 * * * *', () => {
    ChangeOTP()
});

const ChangeOTP = async () => {
    const user = await User.find({});
    for (const item of user) {
        const random = Math.floor(Math.random() * 9000 + 1000);
        await User.updateOne({userEmailId: item?.userEmailId}, {userOtp: random});
    }
};

exports.createUser = async (req, res) => {
    try {
        const {userName, userEmailId, userMobileNumber, userPassword} = req.body;
        const password = bcrypt.hashSync(userPassword, saltRounds);
        const random = Math.floor(Math.random() * 9000 + 1000);
        const payload = {
            userName: userName,
            userEmailId: userEmailId,
            userMobileNumber: userMobileNumber,
            userPassword: password,
            userOtp: random
        };
        const isCreated = await User.create(payload);
        if (isCreated) {
            res.status(200).send({message: "successFully created", userId: isCreated._id, success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {userEmailId, userPassword} = req.body;
        const user = await User.findOne({userEmailId: userEmailId});
        if (bcrypt.compareSync((userPassword || ""), (user?.userPassword || ""))) {
            const mailOptions = {
                from: "hiteshwork07@gmail.com",
                to: userEmailId,
                subject: "Here Is Your OTP",
                text: `
                      OTP: ${user?.userOtp}
                    `
            };

            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error sending email');
                }
                res.status(200).send({message: "OTP Send SuccessFully", success: true})
            });
        } else {
            res.status(400).send({message: "Password Does Not Match!", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        const {userEmailId} = req.body;
        const user = await User.findOne({userEmailId: userEmailId});
        if (user) {
            const mailOptions = {
                from: "hiteshwork07@gmail.com",
                to: userEmailId,
                subject: "Forget PassWord OTP",
                text: `
                      OTP: ${user?.userOtp}
                    `
            };

            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error sending email');
                }
                res.status(200).send({message: "OTP Send SuccessFully", success: true})
            });
        } else {
            res.status(400).send({message: "User Not Found!", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const {userEmailId, userOtp} = req.body;
        const user = await User.findOne({userEmailId: userEmailId});
        if (user) {
            if (userOtp == user?.userOtp) {
                res.status(200).send({message: "OTP Match SuccessFully", success: true})
            } else {
                res.status(400).send({message: "Otp Does Not Match!", success: false})
            }
        } else {
            res.status(400).send({message: "User Not Found!", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const {newPassword, userEmailId} = req.body;
        const user = await User.findOne({userEmailId: userEmailId});
        if (user) {
            const password = bcrypt.hashSync(newPassword, saltRounds);
            const isUpdate = await User.updateOne({userEmailId: userEmailId}, {userPassword: password});
            if (isUpdate) {
                res.status(200).send({message: "successFully updated", success: true})
            } else {
                res.status(400).send({message: "something Went Wrong", success: false})
            }
        } else {
            res.status(400).send({message: "User Not Found!", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};