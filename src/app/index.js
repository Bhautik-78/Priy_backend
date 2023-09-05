const orderRouter = require("./order/router");
const categoryRouter = require("./category/router");
const productRouter = require("./product/router");
const subCategoryRouter = require("./subCategory/router");
const userRouter = require("./user/router");
const invoiceRouter = require("./invoice/router");
const postRouter = require("./post/router");
const blogRouter = require("./blog/router");
const emailRouter = require("./email/router");
const inquiryRouter = require("./landingPageInquiry/router");

const printArtUserRouter = require("./printArtsUser/router");

module.exports = (app) => {
    app.use("/api/order", orderRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/product", productRouter);
    app.use("/api/blog", blogRouter);
    app.use("/api/subCategory", subCategoryRouter);
    app.use("/api/user", userRouter);
    app.use("/api/invoice", invoiceRouter);
    app.use("/api/post", postRouter);
    app.use("/api/email", emailRouter);
    app.use("/api/inquiry", inquiryRouter);

    app.use("/api/PrintArt/user", printArtUserRouter);
};
