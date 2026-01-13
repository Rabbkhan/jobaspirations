import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  getSingleBlogService,
  updateBlogService,
} from "../services/blog.service.js";

export const createBlogController = async (req, res) => {
  try {
    const result = await createBlogService(
      req.body,
      req.user.id,
      req.file
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
};


export const getAllBlogsController = async (req, res) => {
  const blogs = await getAllBlogsService();
  res.status(200).json(blogs);
};

export const getSingleBlogController = async (req, res) => {
  const blog = await getSingleBlogService(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const updateBlogController = async (req, res) => {
  try {
    const blog = await updateBlogService(req.params.id, req.body, req.file);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    await deleteBlogService(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
