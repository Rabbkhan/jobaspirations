import Blog from "../models/blog.model.js";
import slugify from "slugify";
import { deleteFromCloud, uploadToCloud } from "../utils/uploadToCloud.js";

/* =========================
   CREATE BLOG
========================= */
export const createBlogService = async (data, userId, file) => {
  if (!userId) {
    const err = new Error("User ID is required");
    err.status = 400;
    throw err;
  }

  if (!data.title || !data.content || !data.category) {
    const err = new Error("Title, content, and category are required");
    err.status = 400;
    throw err;
  }

  let featuredImage = null;

  if (file) {
    const uploaded = await uploadToCloud(file, "image");
    featuredImage = {
      url: uploaded.url,
      public_id: uploaded.public_id,
    };
  }

  const blog = await Blog.create({
    title: data.title,
    slug: slugify(data.title),
    content: data.content,
    category: data.category,
    published: data.published ?? false,
    author: userId,
    featuredImage,
  });

  return {
    success: true,
    message: "Blog created successfully",
    blogId: blog._id,
    blog,
  };
};

/* =========================
   GET ALL BLOGS
========================= */
export const getAllBlogsService = async () => {
  return await Blog.find()
    .populate("category", "name")
    .populate("author", "name")
    .sort({ createdAt: -1 });
};

/* =========================
   GET SINGLE BLOG
========================= */
export const getSingleBlogService = async (id) => {
  return await Blog.findById(id)
    .populate("category")
    .populate("author");
};

/* =========================
   UPDATE BLOG
========================= */
export const updateBlogService = async (blogId, data, file) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    const err = new Error("Blog not found");
    err.status = 404;
    throw err;
  }

  /* Update image if new file provided */
  if (file) {
    if (blog.featuredImage?.public_id) {
      await deleteFromCloud(blog.featuredImage.public_id);
    }

    const uploaded = await uploadToCloud(file, "image");
    blog.featuredImage = {
      url: uploaded.url,
      public_id: uploaded.public_id,
    };
  }

  blog.title = data.title || blog.title;
  blog.slug = data.title ? slugify(data.title) : blog.slug;
  blog.content = data.content || blog.content;
  blog.category = data.category || blog.category;
  blog.published = data.published ?? blog.published;

  await blog.save();

  return {
    success: true,
    message: "Blog updated successfully",
    blog,
  };
};

/* =========================
   DELETE BLOG
========================= */
export const deleteBlogService = async (blogId) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    const err = new Error("Blog not found");
    err.status = 404;
    throw err;
  }

  if (blog.featuredImage?.public_id) {
    await deleteFromCloud(blog.featuredImage.public_id);
  }

  await blog.deleteOne();

  return {
    success: true,
    message: "Blog deleted successfully",
  };
};
