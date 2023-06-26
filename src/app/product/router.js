require( "./model" );
const multer =require("multer");
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/product")
    },
    filename (req, file, cb) {
        cb(null , file.originalname)
    }
});

const upload = multer({ storage });

router.get("/v1/getMultiImageByName/:id", controller.getMultiImageByProductName)
router.get("/v1/allImage", controller.fetchAllImage);
router.post("/v1/", upload.single("file"), controller.createProduct);
router.put("/v1/multiImage/:productName", upload.array("uploadedImages",1000), controller.updateProductWithMultiImage);
router.get("/v1/:productName", controller.getProductByName);
router.get("/v1/", controller.getAllProduct);
router.put("/v1/:id",upload.single("file"), controller.editProduct);
router.get("/", controller.getProduct);
router.delete("/v1/:id", controller.deleteProduct);

module.exports = router;