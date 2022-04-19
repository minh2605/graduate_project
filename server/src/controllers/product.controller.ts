import { Request, Response } from "express";
const httpStatus = require("http-status");
import ProductModel from "../models/product.model";

const getProducts = async (req: Request, res: Response) => {
  const productList = await ProductModel.find();

  res.status(httpStatus.OK).send(productList);
};

const productController = {
  getProducts,
};

export default productController;
