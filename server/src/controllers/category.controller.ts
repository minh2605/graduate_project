import { Request, Response } from "express";
import httpStatus from "http-status";
import categoryService from "../services/category.service";

const createCategory = async (req: Request, res: Response) => {
  const newCategory = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(newCategory);
};

const getCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  res.status(httpStatus.OK).send(categories);
};

const getCategoryById = async (req: Request, res: Response) => {
  const categoryById = await categoryService.getCategoryById(req.body);
  res.status(httpStatus.OK).send(categoryById);
};

const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
};

export default categoryController;
