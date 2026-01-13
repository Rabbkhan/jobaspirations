import {
  createCategoryService,
  getCategoriesService,
  deleteCategoryService,
  
} from "../services/blogcategory.service.js";

export const createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryService(
      req.body.name
    );

    res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories =
      await getCategoriesService();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await deleteCategoryService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (err) {
    next(err);
  }
};
