import express from "express";
import {
  getBlogCategoriesController,
  getLatestBlogsController,
  getPublicBlogsController,
  getRelatedBlogsController,
} from "../controllers/getPublicBlogsController.js";
import { getPublicBlogBySlugController } from "../controllers/getPublicBlogBySlugController.js";
import { incrementBlogViewController } from "../controllers/incrementBlogViewController.js";

const router = express.Router();

/* PUBLIC BLOGS */
// PUBLIC
router.get("/categories", getBlogCategoriesController);
router.get("/", getPublicBlogsController);
router.get("/latest", getLatestBlogsController);

router.get("/related/:slug", getRelatedBlogsController);
router.get("/:slug", getPublicBlogBySlugController);
router.post("/:slug/increment-views", incrementBlogViewController);

export default router;
