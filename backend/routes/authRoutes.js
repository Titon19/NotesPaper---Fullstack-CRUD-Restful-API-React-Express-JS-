import express from "express";
const router = express.Router();
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controller/authController.js";
import errorValidation from "../validations/authValidation.js";

router.post("/register", errorValidation, register);
router.post("/login", errorValidation, login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
