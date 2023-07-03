const Product = require("../repositories/product");

module.exports = {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

async function fetchProducts(req, res) {
  const products = await Product.find().populate("categories");
  res.json(products);
}

async function fetchProductById(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id).populate("categories");
  res.json(product);
}

async function createProduct(req, res) {
  const { _id } = await Product.create(req.body);
  const product = await Product.findById(_id).populate("categories");
  res.status(201).json(product);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body).populate(
    "categories"
  );
  res.json(product);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).end();
}
