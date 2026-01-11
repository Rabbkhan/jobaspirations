import express from "express";
import { authenticate } from "../middlewares/auth.middleware..js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  updateBlogController
} from "../controllers/blog..controller.js";  // <== fixed filename

const router = express.Router();

router.get("/", getAllBlogsController);
router.post("/", authenticate, authorizeRoles("admin"), createBlogController);
router.put("/:id", authenticate, authorizeRoles("admin"), updateBlogController);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteBlogController);

export default router;
