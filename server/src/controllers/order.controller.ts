import { Request, Response } from "express";
import httpStatus from "http-status";
import { envConfig } from "../config/config";
import { OrderStatus } from "../models/order.model";
import accountService from "../services/account.service";
import orderService from "../services/order.service";
import { catchAsync } from "../utils/catchAsync";

// This is your test secret API key.
const stripe = require("stripe")(envConfig.stripe.privateKey);
const CLIENT_DOMAIN = envConfig.clientSite;

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService.getAccountById(req.body.account_id);
  const newOrder = await orderService.createOrder(req.body);
  const { product_list } = req.body;
  const line_items = product_list.map((product: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer_email: account ? account.email : undefined,
    metadata: { order_id: newOrder._id.toString() },
    line_items: line_items,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${CLIENT_DOMAIN}/checkout?success=true&order_id=${newOrder._id.toString()}`,
    cancel_url: `${CLIENT_DOMAIN}/checkout?canceled=true`,
  });
  res.status(httpStatus.CREATED).send(session.url);
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

const orderController = {
  createOrder,
  fullFillOrder,
};

export default orderController;
