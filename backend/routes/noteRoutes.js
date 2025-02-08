import express from "express";
const router = express.Router();
import {
  getAllNotes,
  getEditNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controller/notesController.js";
import upload from "../utils/multerConfig.js";
import errorValidation from "../validations/noteValidation.js";
import authenticateToken from "../middleware/authMiddleware.js";

router.get("/", authenticateToken, getAllNotes);
router.get("/:id", authenticateToken, getEditNote);
router.post(
  "/",
  upload.single("image"),
  errorValidation,
  authenticateToken,
  createNote
);
router.put(
  "/:id",
  upload.single("image"),
  errorValidation,
  authenticateToken,
  updateNote
);
router.delete("/:id", upload.single("image"), authenticateToken, deleteNote);

export default router;
