import express from "express";
import { adminAuthenticate, authorizeRoles } from "#middlewares/index.js";
import { createCategory, getCategories, deleteCategory } from "./blogcategory.controller.js";

const router = express.Router();

router.post("/", adminAuthenticate, authorizeRoles("admin"), createCategory);
router.get("/", getCategories);
router.delete("/:id", adminAuthenticate, authorizeRoles("admin"), deleteCategory);

export default router;
