require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/", controller.createUser);
router.post("/login", controller.loginUser);
router.post("/forgetPassword", controller.forgetPassword);
router.post("/verifyOtp", controller.verifyOtp);
router.post("/resetPassword", controller.resetPassword);

module.exports = router;