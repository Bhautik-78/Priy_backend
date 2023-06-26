require( "./model" );
const multer =require("multer");
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/post")
    },
    filename (req, file, cb) {
        cb(null , file.originalname)
    }
});

const upload = multer({ storage });

router.post("/v1/", upload.array("uploadedImages",1000), controller.createCategoryImages);
router.delete("/v1/:id", controller.deleteCategoryImages);
router.get("/v1/", controller.getPostImages);
router.get("/", controller.getPostImages);

module.exports = router;
