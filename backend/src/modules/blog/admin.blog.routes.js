import express from "express";
import { adminAuthenticate, authorizeRoles, upload } from "#middlewares/index.js";
import {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
} from "./blog.controller.js";

const router = express.Router();

router.use(adminAuthenticate, authorizeRoles("admin"));

router.post("/create", upload.single("image"), createBlogController);
router.get("/", getAllBlogsController);
router.get("/:id", getSingleBlogController);
router.put("/:id", upload.single("image"), updateBlogController);
router.delete("/:id", deleteBlogController);

export default router;
