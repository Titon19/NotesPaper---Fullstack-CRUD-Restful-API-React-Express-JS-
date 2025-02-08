import { body } from "express-validator";
const errorValidation = [
  body("name").not().isEmpty().withMessage("Harap isi nama kategori"),
];

export default errorValidation;
