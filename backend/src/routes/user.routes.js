import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";
import { updateProfileController } from "../controllers/auth.controller.js";
import { updateUserValidation } from "../validations/authValidation.js";

const router = express.Router();

router.put("/profile/update", authenticate, updateUserValidation, updateProfileController);


export default router;
