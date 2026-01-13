import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";
import slugify from "slugify";

export const createCategoryService = async (name) => {
  if (!name?.trim()) {
    const err = new Error("Category name is required");
    err.status = 400;
    throw err;
  }

  const existing = await Category.findOne({ name });
  if (existing) {
    const err = new Error("Category already exists");
    err.status = 400;
    throw err;
  }

  return await Category.create({
    name: name.trim(),
    slug: slugify(name, { lower: true, strict: true }),
  });
};

export const getCategoriesService = async () => {
  return await Category.find().sort({ name: 1 });
};

export const deleteCategoryService = async (id) => {
  const blogCount = await Blog.countDocuments({ category: id });

  if (blogCount > 0) {
    const err = new Error(
      "Cannot delete category with existing blogs"
    );
    err.status = 400;
    throw err;
  }

  return await Category.findByIdAndDelete(id);
};
