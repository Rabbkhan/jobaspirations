import blogModel from "../models/blog.model.js";
import { getBlogCategoriesService, getPublicBlogsService, getRelatedBlogsService } from "../services/getPublicBlogsService.js";

export const getPublicBlogsController = async (req, res) => {
  try {
    const { page, limit, category, search } = req.query;

    const result = await getPublicBlogsService({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      category,
      search,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};



export const getBlogCategoriesController = async (req, res) => {
  try {
    const categories = await getBlogCategoriesService();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog categories",
    });
  }
};



export const getRelatedBlogsController = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1️⃣ Find the current blog by slug
    const currentBlog = await blogModel.findOne({ slug, published: true }).lean();
    if (!currentBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // 2️⃣ Fetch related blogs
    const relatedBlogs = await getRelatedBlogsService(currentBlog._id, currentBlog.category);

    res.status(200).json({
      success: true,
      related: relatedBlogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch related blogs"
    });
  }
};



export const getLatestBlogsController = async (req, res) => {
  try {
    const latestBlogs = await blogModel.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("title slug featuredImage createdAt category author")
      .populate("category", "name slug")
      .populate("author", "fullname")
      .lean();

    res.status(200).json({ success: true, blogs: latestBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch latest blogs" });
  }
};
