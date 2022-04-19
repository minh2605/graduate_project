import { Request, Response } from "express";
const httpStatus = require("http-status");
import CategoryModel from "../models/category.model";

const getCategories = async (req: Request, res: Response) => {
  const categoryList = await CategoryModel.find();

  res.status(httpStatus.OK).send(categoryList);
};

const categoryController = {
  getCategories,
};

export default categoryController;
