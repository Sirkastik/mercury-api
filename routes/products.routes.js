const { Router } = require("express");
const { validateSchema, productSchema } = require("../schema");
const ProductService = require("../services/product");

const router = Router();

router.get("/", ProductService.fetchProducts);

router.get("/:id", ProductService.fetchProductById);

router.post(
  "/",
  validateSchema(productSchema.create),
  ProductService.createProduct
);

router.put(
  "/:id",
  validateSchema(productSchema.update),
  ProductService.updateProduct
);

router.delete("/:id", ProductService.deleteProduct);

module.exports = { router };
