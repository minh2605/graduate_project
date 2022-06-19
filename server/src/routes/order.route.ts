import express from "express";
import orderController from "../controllers/order.controller";

const router = express.Router();

router.route("/create").post(orderController.createOrder);

export default router;
