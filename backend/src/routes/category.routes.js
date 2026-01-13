import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/blogcategory.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { adminAuthenticate } from "../middlewares/admin.middleware.js";
const router = express.Router();

router.post("/", adminAuthenticate, authorizeRoles('admin'), createCategory);
router.get("/", getCategories);
router.delete("/:id", adminAuthenticate, authorizeRoles('admin'), deleteCategory);

export default router;
