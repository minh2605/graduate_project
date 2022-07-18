import OrderModel, { OrderDocument, OrderStatus } from "../models/order.model";
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
  const archived = req.query.archived;
  let perPage = limit >= 1 && limit < 9 ? limit : 9;
  let page = Number(req.query.page) || 1;

  const orderList = await OrderModel.find({ isDelete: archived })
    .sort({ _id: -1 })
    .skip(perPage * (page - 1))
    .limit(perPage);
  const totalOrder = await OrderModel.find({
    isDelete: archived,
  }).countDocuments({});
  const totalPage = Math.ceil(totalOrder / perPage);

  return {
    orderList,
    currentPage: page,
    limit: perPage,
    totalOrder,
    totalPage: totalPage,
  };
};

const getOrdersByAccountId = async (
  accountId: string,
  req: Request,
  res: Response
) => {
  const limit = Number(req.query.limit);
  let perPage = limit >= 1 && limit < 9 ? limit : 9;
  let page = Number(req.query.page) || 1;
  const orderList = await OrderModel.find({ account_id: accountId })
    .sort({
      _id: -1,
    })
    .skip(perPage * (page - 1))
    .limit(perPage);
  const totalOrder = await OrderModel.find({
    isDelete: false,
    account_id: accountId,
  }).countDocuments({});

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

const resolveOrder = async (id: string) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  order.status = OrderStatus.FULLFILL;
  order.save();
  return order;
};

const retrieveOrder = async (id: string) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  order.isDelete = false;
  order.save();
  return order;
};

const getRevenueByDateRange = async (from: any, to: any) => {
  const toDate = new Date(to);
  toDate.setDate(toDate.getDate() + 1);
  const orderListByDateRange = await OrderModel.find({
    createdAt: {
      $gte: new Date(from),
      $lt: new Date(toDate.toISOString().slice(0, 10)),
    },
  });

  console.log("orderListByDateRange", orderListByDateRange);

  const revenueData = orderListByDateRange.reduce((result: any, item) => {
    const dateItem = {
      date: item?.createdAt?.toISOString().toString().slice(0, 10),
      price: item.total_net_amount,
    };

    const itemExist = result.find((it: any) => {
      return it.date === dateItem.date;
    });

    if (!!itemExist) {
      itemExist.price += dateItem.price;
    } else result.push(dateItem);
    return result;
  }, []);
  console.log("revenueData", revenueData);
  return revenueData;
};

const orderService = {
  createOrder,
  getOrderById,
  getOrders,
  deleteOrder,
  softDeleteOrderById,
  getRevenueByDateRange,
  getOrdersByAccountId,
  resolveOrder,
  retrieveOrder,
};

export default orderService;
