import blogModel from "../models/blog.model";

// Fetch all blogs
export const fetchAllBlogs = async () => {
  return blogModel.find().sort({ createdAt: -1 });
};

// Create new blog
export const createBlog = async (data, authorId) => {
  return Blog.create({
    title: data.title,
    content: data.content,
    published: data.published || false,
    author: authorId,
  });
};

// Update existing blog
export const updateBlog = async (id, data) => {
  return Blog.findByIdAndUpdate(
    id,
    { title: data.title, content: data.content, published: data.published },
    { new: true }
  );
};

// Delete blog
export const deleteBlog = async (id) => {
  return Blog.findByIdAndDelete(id);
};
