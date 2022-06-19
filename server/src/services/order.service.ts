import OrderModel from "../models/order.model";
import { UserCreateProps } from "./user.service";

const createOrder = async (userBody: UserCreateProps) => {
  const newUser = await OrderModel.create(userBody);
  return newUser;
};

const orderService = {
  createOrder,
};

export default orderService;
