import express from "express";
const router = express.Router();

import {
  getAllCategories,
  createCategory,
  getEditCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoriesController.js";
import errorValidation from "../validations/categoryValidation.js";
import authenticateToken from "../middleware/authMiddleware.js";

router.get("/", authenticateToken, getAllCategories);
router.post("/", errorValidation, authenticateToken, createCategory);
router.get("/:id", authenticateToken, getEditCategory);
router.put("/:id", errorValidation, authenticateToken, updateCategory);
router.delete("/:id", authenticateToken, deleteCategory);

export default router;
