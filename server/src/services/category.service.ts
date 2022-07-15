import httpStatus from "http-status";
import CategoryModel, { CategoryDocument } from "../models/category.model";
import { Request, Response } from "express";
import ApiError from "../utils/ApiError";

const createCategory = async (categoryBody: CategoryDocument) => {
  const category = await CategoryModel.create(categoryBody);
  return category;
};

const getCategories = async (req: Request, res: Response) => {
  const archived = req.query.archived === "true" ? true : false;
  console.log("archived", archived);
  const categoryList = await CategoryModel.find({ isDelete: archived }).sort({
    _id: -1,
  });
  return categoryList;
};

const getCategoryById = async (id: string) => {
  return CategoryModel.findById(id);
};

const updateCategoryById = async (
  categoryId: string,
  updateBody: any,
  imagePath: string
) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  console.log("category.image", category.image);
  if (imagePath) {
    category.image = imagePath;
  }
  Object.assign(category, updateBody);
  await category.save();
  console.log("UPDATE category", category);
  return category;
};

const softDeleteCategoryById = async (id: string) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  category.isDelete = true;
  await category.save();
};

const deleteCategory = async (id: string) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  await category.remove();
  return category;
};

const retrieveCategory = async (id: string) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  category.isDelete = false;
  category.save();
  return category;
};

const categoryService = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategoryById,
  softDeleteCategoryById,
  retrieveCategory,
};

export default categoryService;
