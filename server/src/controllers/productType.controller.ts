import { Request, Response } from "express";
import httpStatus from "http-status";
import ProductTypeModel from "../models/productType.model";
import productTypeService from "../services/productType.service";

const createProductType = async (req: Request, res: Response) => {
  const productType = await productTypeService.createProductType(req.body);
  res.status(httpStatus.CREATED).send(productType);
};

const getProductTypes = async (req: Request, res: Response) => {
  const productTypeList = await ProductTypeModel.find();
  res.status(httpStatus.OK).send(productTypeList);
};

const getProductTypeById = async (req: Request, res: Response) => {
  const productTypeByID = await ProductTypeModel.find();
  res.status(httpStatus.OK).send(productTypeByID);
};

const updateProductType = async (req: Request, res: Response) => {
  const productTypeUpdate = await ProductTypeModel.find();
  res.status(httpStatus.OK).send(productTypeUpdate);
};

const productTypeController = {
  getProductTypes,
  createProductType,
  getProductTypeById,
  updateProductType,
};
export default productTypeController;
