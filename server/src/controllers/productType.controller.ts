import { Request, Response } from "express";
import httpStatus from "http-status";
import ProductTypeModel from "../models/productType.model";
import productTypeService from "../services/productType.service";
import { catchAsync } from "../utils/catchAsync";

const createProductType = catchAsync(async (req: Request, res: Response) => {
  const productType = await productTypeService.createProductType(req.body);
  res.status(httpStatus.CREATED).send(productType);
});

const getProductTypes = catchAsync(async (req: Request, res: Response) => {
  const productTypeList = await productTypeService.getProductTypes();
  res.status(httpStatus.OK).send(productTypeList);
});

const getProductTypeById = catchAsync(async (req: Request, res: Response) => {
  const { id: productTypeId } = req.params;
  const productTypeByID = await productTypeService.getProductTypeById(
    productTypeId
  );
  res.status(httpStatus.OK).send(productTypeByID);
});

const updateProductType = catchAsync(async (req: Request, res: Response) => {
  const productTypeUpdate = await ProductTypeModel.find();
  res.status(httpStatus.OK).send(productTypeUpdate);
});

const productTypeController = {
  getProductTypes,
  createProductType,
  getProductTypeById,
  updateProductType,
};
export default productTypeController;
