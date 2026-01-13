import Category from "../models/category.model.js";
import blogModel from "../models/blog.model.js";

export const getPublicBlogsService = async ({
  page = 1,
  limit = 10,
  category,
  search,
}) => {
  const query = { published: true };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const blogs = await blogModel.find(query)
    .select("title slug content featuredImage category createdAt")
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await blogModel.countDocuments(query);

  return {
    blogs,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};




export const getBlogCategoriesService = async () => {
  // Get distinct category IDs from published blogs
  const categoryIds = await Blog.distinct("category", {
    published: true,
  });

  // Fetch categories that are actually used
  const categories = await Category.find({
    _id: { $in: categoryIds },
  })
    .select("name slug")
    .sort({ name: 1 })
    .lean();

  return categories;
};


// getRelatedBlogsService
export const getRelatedBlogsService = async (blogId, categoryId, limit = 4) => {
  return await blogModel.find({
    _id: { $ne: blogId },       // exclude current blog
    category: categoryId,       // same category
    published: true
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("title slug featuredImage createdAt")
    .lean();
};
