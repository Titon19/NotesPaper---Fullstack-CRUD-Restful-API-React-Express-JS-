import { body } from "express-validator";
const errorValidation = [
  body("email").not().isEmpty().withMessage("Harap isi email"),
  body("password").not().isEmpty().withMessage("Harap isi password"),
];

export default errorValidation;
