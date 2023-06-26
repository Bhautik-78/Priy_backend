require( "./model" );
const multer =require("multer");
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/blog")
    },
    filename (req, file, cb) {
        cb(null , file.originalname)
    }
  })

const upload = multer({ storage });

router.post("/v1/", upload.single("blogImage"), controller.createBlogs);
router.get("/v1/:blogName", controller.getBlogsByName);
router.get("/v1/", controller.getAllBlogs);
router.put("/v1/:id",upload.single("blogImage"), controller.editBlogs);
router.get("/", controller.getBlogs);
router.delete("/v1/:id", controller.deleteBlogs);

module.exports = router;