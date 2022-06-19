import { Request, Response } from "express";
import httpStatus from "http-status";
import { envConfig } from "../config/config";
import orderService from "../services/order.service";
import { catchAsync } from "../utils/catchAsync";

// This is your test secret API key.
const stripe = require("stripe")(envConfig.stripe.privateKey);
const CLIENT_DOMAIN = envConfig.clientSite;

const createOrder = catchAsync(async (req: Request, res: Response) => {
  //   const newOrder = await orderService.createOrder(req.body);
  console.log("body", req.body);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "usd",
          product_data: {
            name: "Minh",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${CLIENT_DOMAIN}/checkout?success=true`,
    cancel_url: `${CLIENT_DOMAIN}/checkout?canceled=true`,
  });
  console.log("session", session);

  res.redirect(303, session.url);
  //   res.status(httpStatus.CREATED).send(newOrder);
});

const orderController = {
  createOrder,
};

export default orderController;
