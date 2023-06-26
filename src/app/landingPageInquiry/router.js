require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/", controller.createInquiry);
router.get("/", controller.getInquiry);

module.exports = router;
