import { getPublicBlogBySlugService } from "../services/getPublicBlogBySlugService.js";

export const getPublicBlogBySlugController = async (req, res) => {
  try {
    const blog = await getPublicBlogBySlugService(req.params.slug);

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch blog",
    });
  }
};
