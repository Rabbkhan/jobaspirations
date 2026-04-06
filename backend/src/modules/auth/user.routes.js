import express from "express";
import {
  authenticate,
  adminAuthenticate,
  authorizeRoles,
  upload,
} from "#middlewares/index.js";
import {
  loginValidation,
  registerValidation,
  updateUserValidation,
} from "./auth.validation.js";
import {
  login,
  logout,
  register,
  forgotPasswordController,
  getProfile,
  requestVerificationCode,
  resetPasswordController,
  updateProfileController,
  verifyEmail,
} from "./auth.controller.js";
import {
  adminLoginController,
  adminLogoutController,
  adminMeController,
  approveUser,
  getPendingUsers,
} from "../application/admin/admin.controller.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profilePhoto"),
  registerValidation,
  register,
);
router.post("/login", loginValidation, login);
router.get("/logout", logout);
router.get("/profile", authenticate, getProfile);
router.put(
  "/profile/update",
  authenticate,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  updateUserValidation,
  updateProfileController,
);
router.post("/verifyemail", verifyEmail);
router.post("/verifyemail/request", requestVerificationCode);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
router.post("/admin/login", adminLoginController);
router.post("/admin/logout", adminLogoutController);
router.get(
  "/admin/me",
  adminAuthenticate,
  authorizeRoles("admin"),
  adminMeController,
);
router.get(
  "/admin/pending-users",
  adminAuthenticate,
  authorizeRoles("admin"),
  getPendingUsers,
);
router.patch(
  "/admin/approve/:userId",
  adminAuthenticate,
  authorizeRoles("admin"),
  approveUser,
);

export default router;
