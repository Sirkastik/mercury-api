const { Router } = require("express");
const CategoryService = require("../services/category");
const { validateSchema, categorySchema } = require("../schema");

const router = Router();

router.get("/", CategoryService.fetchCategories);

router.get("/:id", CategoryService.fetchCategoryById);

router.post(
  "/",
  validateSchema(categorySchema.create),
  CategoryService.createCategory
);

router.put(
  "/:id",
  validateSchema(categorySchema.update),
  CategoryService.updateCategory
);

router.delete("/:id", CategoryService.deleteCategory);

module.exports = { router };
