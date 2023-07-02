const Product = require("../repositories/product");

module.exports = {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

async function fetchProducts(req, res) {
  const products = await Product.find().populate(["categories", "images"]);
  res.json(products);
}

async function fetchProductById(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id).populate(["categories", "images"]);
  res.json(product);
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.json(product);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body).populate([
    "categories",
    "images",
  ]);
  res.json(product);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ success: true });
}
