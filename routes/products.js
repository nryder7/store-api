const express = require("express");
const productRouter = express.Router();
const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
} = require("../controllers/products");

productRouter.route("/").get(getAllProducts).post(addProduct);
productRouter
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateSingleProduct)
  .delete(deleteSingleProduct);

module.exports = productRouter;
