import { Request, Response } from "express";
import httpStatus from "http-status";
import categoryService from "../services/category.service";
import { catchAsync } from "../utils/catchAsync";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const newCategory = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(newCategory);
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  res.status(httpStatus.OK).send(categories);
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id: categoryId } = req.params;
  const categoryById = await categoryService.getCategoryById(categoryId);
  res.status(httpStatus.OK).send(categoryById);
});

const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
};

export default categoryController;
