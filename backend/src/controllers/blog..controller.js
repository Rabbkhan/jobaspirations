
// GET all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogService.fetchAllBlogs();
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE blog
export const createBlogController = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body, req.user._id);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE blog
export const updateBlogController = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE blog
export const deleteBlogController = async (req, res) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
