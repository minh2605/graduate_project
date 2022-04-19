import { Request, Response } from "express";
const httpStatus = require("http-status");
import ProductTypeModel from "../models/productType.model";

const getProductTypes = async (req: Request, res: Response) => {
  const productTypeList = await ProductTypeModel.find();

  res.status(httpStatus.OK).send(productTypeList);
};

const productTypeController = {
  getProductTypes,
};
export default productTypeController;
