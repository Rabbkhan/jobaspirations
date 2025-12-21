import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";
import { updateProfileController } from "../controllers/auth.controller.js";
import { updateUserValidation } from "../validations/authValidation.js";
import { upload } from "../middlewares/multer.js";

import { login, logout, register } from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profilePhoto"),
  registerValidation,
  register
);

router.post("/login", loginValidation, login);
router.get("/logout", logout);
router.put(
  "/profile/update",
  authenticate,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),updateUserValidation,
  updateProfileController
);

export default router;
