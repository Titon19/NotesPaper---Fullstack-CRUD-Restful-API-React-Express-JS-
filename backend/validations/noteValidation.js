import { body } from "express-validator";
const errorValidation = [
  body("title").not().isEmpty().withMessage("Harap isi judul"),
  body("content").not().isEmpty().withMessage("Harap isi konten"),
  body("category_id").not().isEmpty().withMessage("Harap pilih kategori"),
];

export default errorValidation;
