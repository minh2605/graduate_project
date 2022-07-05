import { Request, Response } from "express";
import httpStatus from "http-status";
import { envConfig } from "../config/config";
import { OrderStatus, PaymentType } from "../models/order.model";
import accountService from "../services/account.service";
import orderService from "../services/order.service";
import { catchAsync } from "../utils/catchAsync";

// This is your test secret API key.
const stripe = require("stripe")(envConfig.stripe.privateKey);
const CLIENT_DOMAIN = envConfig.clientSite;

const createOrder = catchAsync(async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const account = await accountService.getAccountById(req.body.account_id);
  const newOrder = await orderService.createOrder(req.body);
  const successUrl = `${CLIENT_DOMAIN}/store/checkout/${newOrder._id.toString()}?success=true`;
  const cancelUrl = `${CLIENT_DOMAIN}/store/checkout/${newOrder._id.toString()}?cancel=true`;
  const { product_list, payment_type } = req.body;
  if (payment_type === PaymentType.CASH) {
    res
      .status(httpStatus.CREATED)
      .send(`/store/checkout/${newOrder._id.toString()}?success=true`);
    return;
  }
  const line_items = product_list.map((product: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer_email: account ? account.email : undefined,
    metadata: { order_id: newOrder._id.toString() },
    line_items: line_items,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  res.status(httpStatus.CREATED).send(session.url);
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const orderList = await orderService.getOrders(req, res);
  res.status(httpStatus.OK).send(orderList);
});

const getOrdersByAccountId = catchAsync(async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const orderList = await orderService.getOrdersByAccountId(accountId);
  res.status(httpStatus.OK).send(orderList);
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const orderById = await orderService.getOrderById(orderId);
  res.status(httpStatus.OK).send(orderById);
});

const fullFillOrder = catchAsync(async (req: Request, res: Response) => {
  const event = req.body;
  console.log("event", event);
  const eventData = event.data.object;
  if (event.type === "checkout.session.completed") {
    if (eventData.status === "complete") {
      const order = await orderService.getOrderById(
        eventData.metadata.order_id
      );
      if (order) {
        order.status = OrderStatus.FULLFILL;
        order.save();
        res.status(httpStatus.OK).send(order);
      }
    }
  } else {
    res.status(httpStatus.OK).send("Create order fail");
  }
});
const softDeleteOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  await orderService.softDeleteOrderById(orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  await orderService.deleteOrder(orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getRevenueByDateRange = catchAsync(
  async (req: Request, res: Response) => {
    const { from: fromDate, to: toDate } = req.query;
    const revenueData = await orderService.getRevenueByDateRange(
      fromDate,
      toDate
    );
    res.status(httpStatus.OK).send(revenueData);
  }
);
const orderController = {
  createOrder,
  fullFillOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  softDeleteOrderById,
  getRevenueByDateRange,
  getOrdersByAccountId,
};

export default orderController;
