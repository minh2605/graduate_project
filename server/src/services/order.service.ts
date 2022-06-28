import OrderModel, { OrderDocument } from "../models/order.model";
import uniqid from "uniqid";
import { Request, Response } from "express";

const createOrder = async (orderBody: Omit<OrderDocument, "orderCode">) => {
  const orderCode =
    orderBody.account_id.toString().slice(0, 1) +
    orderBody.order_type_id.toString().substr(-2) +
    orderBody.date.toString().substr(-2) +
    uniqid.process().slice(2);
  const newOrder = await OrderModel.create({ ...orderBody, orderCode });
  return newOrder;
};

const getOrderById = async (id: string) => {
  return OrderModel.findById(id);
};

const getOrders = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  let perPage = limit >= 1 && limit < 9 ? limit : 9;
  let page = Number(req.query.page) || 1;

  console.log("perPage", perPage);

  const orderList = await OrderModel.find()
    .skip(perPage * (page - 1))
    .limit(perPage);
  const totalOrder = await OrderModel.countDocuments({});
  const totalPage = Math.ceil(totalOrder / perPage);

  return {
    orderList,
    currentPage: page,
    limit: perPage,
    totalOrder,
    totalPage: totalPage,
  };
};

const orderService = {
  createOrder,
  getOrderById,
  getOrders,
};

export default orderService;
