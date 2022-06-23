import OrderModel, { OrderDocument } from "../models/order.model";
import { UserCreateProps } from "./user.service";

const createOrder = async (orderBody: OrderDocument) => {
  const newOrder = await OrderModel.create(orderBody);
  return newOrder;
};

const getOrderById = async (id: string) => {
  return OrderModel.findById(id);
};

const orderService = {
  createOrder,
  getOrderById,
};

export default orderService;
