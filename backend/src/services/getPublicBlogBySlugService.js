import Blog from '../models/blog.model.js'

export const getPublicBlogBySlugService = async (slug) => {
  const blog = await Blog.findOne({
    slug,
    published: true,
  })
    .populate("category", "name slug")
    .populate("author", "fullname")
    .lean();

  if (!blog) {
    const err = new Error("Blog not found");
    err.status = 404;
    throw err;
  }

  return blog;
};



