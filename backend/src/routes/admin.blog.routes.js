import express from "express";
import { adminAuthenticate } from "../middlewares/admin.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.js";
import {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.use(adminAuthenticate, authorizeRoles("admin"));

router.post("/create", upload.single("image"), createBlogController);
router.get("/", getAllBlogsController);
router.get("/:id", getSingleBlogController);
router.put("/:id", upload.single("image"), updateBlogController);
router.delete("/:id", deleteBlogController);

export default router;
