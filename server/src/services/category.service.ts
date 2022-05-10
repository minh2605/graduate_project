import CategoryModel, { CategoryDocument } from "../models/category.model";

const createCategory = async (categoryBody: CategoryDocument) => {
  const productType = await CategoryModel.create(categoryBody);
  return productType;
};

const getCategories = async () => {
  const productTypeList = await CategoryModel.find();
  return productTypeList;
};

const getCategoryById = async (id: string) => {
  return CategoryModel.findById(id);
};

const categoryService = {
  createCategory,
  getCategories,
  getCategoryById,
};

export default categoryService;
