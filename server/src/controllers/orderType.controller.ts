import { Request, Response } from "express";
import httpStatus from "http-status";
import orderTypeService from "../services/orderType.service";

import { catchAsync } from "../utils/catchAsync";

const createOrderType = catchAsync(async (req: Request, res: Response) => {
  const orderType = await orderTypeService.createOrderType(req.body);
  res.status(httpStatus.CREATED).send(orderType);
});

const getOrderTypes = catchAsync(async (req: Request, res: Response) => {
  const productTypeList = await orderTypeService.getOrderTypes();
  res.status(httpStatus.OK).send(productTypeList);
});

const getOrderTypeById = catchAsync(async (req: Request, res: Response) => {
  const { id: productTypeId } = req.params;
  const productTypeByID = await orderTypeService.getOrderTypeById(
    productTypeId
  );
  res.status(httpStatus.OK).send(productTypeByID);
});

const orderTypeController = {
  createOrderType,
  getOrderTypes,
  getOrderTypeById,
};
export default orderTypeController;
