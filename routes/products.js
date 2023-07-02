const { Router } = require("express");
const { validateSchema, createProduct, updateProduct } = require("../schema");
const ProductService = require("../services/product");

const router = Router();

router.get("/", ProductService.fetchProducts);

router.get("/:id", ProductService.fetchProductById);

router.post("/", validateSchema(createProduct), ProductService.createProduct);

router.put("/:id", validateSchema(updateProduct), ProductService.updateProduct);

router.delete("/:id", ProductService.deleteProduct);

module.exports = router;
