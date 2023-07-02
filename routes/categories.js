const { Router } = require("express");
const CategoryService = require("../services/category");

const router = Router();

router.get("/", CategoryService.fetchCategories);

router.get("/:id", CategoryService.fetchCategoryById);

router.post("/", CategoryService.createCategory);

router.put("/:id", CategoryService.updateCategory);

router.delete("/:id", CategoryService.deleteCategory);

module.exports = router;
