const express = require("express");
const router = express.Router();
const notesController = require("../controller/notesController");
const { body } = require("express-validator");

const errorValidation = [
  body("title").not().isEmpty().withMessage("Harap isi judul"),
  body("content").not().isEmpty().withMessage("Harap isi konten"),
  body("category_id").not().isEmpty().withMessage("Harap pilih kategori"),
];

router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getEditNote);
router.post("/", errorValidation, notesController.createNote);
router.put("/:id", errorValidation, notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

module.exports = router;
