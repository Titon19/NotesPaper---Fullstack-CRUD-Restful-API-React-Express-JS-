const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categoriesController");
const { body } = require("express-validator");

const errorValidation = [
  body("name").not().isEmpty().withMessage("Harap isi nama kategori"),
];

router.get("/", categoriesController.getAllCategories);
router.post("/", errorValidation, categoriesController.createCategory);
router.get("/:id", categoriesController.getEditCategory);
router.put("/:id", errorValidation, categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
