const Category = require("../repositories/category");

module.exports = {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

async function fetchCategories(req, res) {
  const categories = await Category.find();
  res.json(categories);
}

async function fetchCategoryById(req, res) {
  const { id } = req.params;
  const category = await Category.findById(id);
  res.json(category);
}

async function createCategory(req, res) {
  const category = await Category.create(req.body);
  res.status(201).json(category);
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body);
  res.json(category);
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(204).end();
}
