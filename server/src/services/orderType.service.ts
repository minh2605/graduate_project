import OrderTypeModel from "../models/orderType.model";

const createOrderType = async (orderTypeBody: any) => {
  const orderType = await OrderTypeModel.create(orderTypeBody);
  return orderType;
};

const getOrderTypes = async () => {
  const orderTypeList = await OrderTypeModel.find();
  return orderTypeList;
};

const getOrderTypeById = async (id: string) => {
  return OrderTypeModel.findById(id);
};

const orderTypeService = {
  createOrderType,
  getOrderTypes,
  getOrderTypeById,
};

export default orderTypeService;
