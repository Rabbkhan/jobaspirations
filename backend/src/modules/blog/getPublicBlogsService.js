import blogModel from "./blog.model.js";
import Category from "#modules/blog-category/category.model.js";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";

// Initialize DOMPurify for server-side
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const getPublicBlogsService = async ({ page = 1, limit = 10, category, search } = {}) => {
  // Build query for published blogs
  const query = { published: true };

  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  // Fetch blogs with populated category
  const blogs = await blogModel
    .find(query)
    .select("title slug content featuredImage category createdAt author")
    .populate("category", "name slug")
    .populate("author", "fullname")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // Sanitize content for safety but keep HTML intact
  const sanitizedBlogs = blogs.map((blog) => ({
    ...blog,
    content: DOMPurify.sanitize(blog.content, {
      USE_PROFILES: { html: true }, // keep headings, paragraphs, lists, links
      ADD_ATTR: ["target", "class", "style"], // keep styling & links
    }),
  }));

  const total = await blogModel.countDocuments(query);

  return {
    blogs: sanitizedBlogs,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
};

// Fetch all blog categories (used by filters)
export const getBlogCategoriesService = async () => {
  const categoryIds = await blogModel.distinct("category", { published: true });

  const categories = await Category.find({ _id: { $in: categoryIds } })
    .select("name slug")
    .sort({ name: 1 })
    .lean();

  return categories;
};

// Fetch related blogs
export const getRelatedBlogsService = async (blogId, categoryId, limit = 4) => {
  const related = await blogModel
    .find({
      _id: { $ne: blogId },
      category: categoryId,
      published: true,
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("title slug featuredImage createdAt")
    .lean();

  return related;
};
