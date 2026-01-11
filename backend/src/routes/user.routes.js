import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";
import { forgotPasswordController, requestVerificationCode, resetPasswordController, updateProfileController, verifyEmail } from "../controllers/auth.controller.js";
import { updateUserValidation } from "../validations/authValidation.js";
import { upload } from "../middlewares/multer.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import { login, logout, register } from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidation.js";
import { adminLoginController, adminMeController, approveUser, getPendingUsers } from "../controllers/admin.controller.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

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
router.post("/verifyemail", verifyEmail)
router.post("/verifyemail/request", requestVerificationCode)
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

router.post("/admin/login",  adminLoginController);
router.get(
  "/admin/me",
  authenticateAdmin,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      role: "admin",
      id: req.admin.id,
    });
  }
);

router.post("/admin/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});


router.get("/adminDashboard", authenticate, authorizeRoles("admin"), getPendingUsers);
router.patch("/approve/:userId", authenticate, authorizeRoles("admin"), approveUser);

export default router;
