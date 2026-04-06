import mongoose from "mongoose";
import Blog from "./blog.model.js";
import slugify from "slugify";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import { deleteFromCloud, uploadToCloud } from "#utils/uploadToCloud.js";

// Initialize DOMPurify for server-side
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const createBlogService = async (data, userId, file) => {
  if (!userId) throw new Error("User ID is required");
  if (!data.title || !data.content || !data.category)
    throw new Error("Title, content, and category are required");

  let featuredImage = null;
  if (file) {
    const uploaded = await uploadToCloud(file, "image");
    featuredImage = { url: uploaded.url, public_id: uploaded.public_id };
  }

  // ✅ SANITIZE TinyMCE HTML without stripping standard tags
  const sanitizedContent = DOMPurify.sanitize(data.content, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "class", "style"],
  });

  const slug = (data.title, { lower: true, strict: true }) + "-" + Date.now();

  const blog = await Blog.create({
    title: data.title,
    slug,
    content: sanitizedContent,
    category: data.category,
    published: data.published ?? false,
    author: userId,
    featuredImage,
  });

  return { success: true, blogId: blog._id, blog };
};
/* =========================
   GET ALL BLOGS WITH PAGINATION
========================= */
export const getAllBlogsService = async ({
  page = 1,
  limit = 10,
  category,
  search,
} = {}) => {
  const query = { published: true };

  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const blogs = await Blog.find(query)
    .populate("category", "name slug")
    .populate("author", "name fullname")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Blog.countDocuments(query);

  return {
    blogs,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
};

/* =========================
   GET SINGLE BLOG
========================= */
export const getSingleBlogService = async (idOrSlug) => {
  const query = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };

  const blog = await Blog.findOne(query)
    .populate("category", "name slug")
    .populate("author", "name email fullname");

  if (!blog) throw { status: 404, message: "Blog not found" };
  return blog;
};

/* =========================
   UPDATE BLOG
========================= */
export const updateBlogService = async (blogId, data, file) => {
  if (!mongoose.Types.ObjectId.isValid(blogId))
    throw new Error("Invalid blog ID");

  const blog = await Blog.findById(blogId);
  if (!blog) throw new Error("Blog not found");

  if (file) {
    if (blog.featuredImage?.public_id)
      await deleteFromCloud(blog.featuredImage.public_id);
    const uploaded = await uploadToCloud(file, "image");
    blog.featuredImage = { url: uploaded.url, public_id: uploaded.public_id };
  }

  if (data.title) {
    blog.title = data.title;
    blog.slug =
      slugify(data.title, { lower: true, strict: true }) + "-" + Date.now();
  }

  if (data.content) {
    blog.content = DOMPurify.sanitize(data.content, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "class", "style"],
    });
  }

  blog.category = data.category || blog.category;
  blog.published = data.published ?? blog.published;

  await blog.save();

  return { success: true, message: "Blog updated successfully", blog };
};

/* =========================
   DELETE BLOG
========================= */
export const deleteBlogService = async (blogId) => {
  if (!mongoose.Types.ObjectId.isValid(blogId))
    throw { status: 400, message: "Invalid blog ID" };

  const blog = await Blog.findById(blogId);
  if (!blog) throw { status: 404, message: "Blog not found" };

  if (blog.featuredImage?.public_id) {
    try {
      await deleteFromCloud(blog.featuredImage.public_id);
    } catch (err) {
      console.error("Failed to delete image from cloud:", err);
    }
  }

  await blog.deleteOne();

  return { success: true, message: "Blog deleted successfully" };
};
