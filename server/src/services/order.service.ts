import OrderModel, { OrderDocument } from "../models/order.model";
import uniqid from "uniqid";
import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

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

  // const x = await OrderModel.find({
  //   date: {
  //     $gte: new Date("2022-06-27"),
  //     $lte: new Date("2022-07-20"),
  //   },
  // });
  // console.log("x", x);

  const orderList = await OrderModel.find({ isDelete: false })
    .sort({ _id: -1 })
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

const softDeleteOrderById = async (id: string) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  order.isDelete = true;
  await order.save();
};

const deleteOrder = async (id: string) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  await order.remove();
  return order;
};

const orderService = {
  createOrder,
  getOrderById,
  getOrders,
  deleteOrder,
  softDeleteOrderById,
};

export default orderService;
