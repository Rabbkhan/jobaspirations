import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

export default router;
