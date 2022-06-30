import express from "express";
import orderController from "../controllers/order.controller";

const router = express.Router();

router.route("/create").post(orderController.createOrder);
router.route("/list").get(orderController.getOrders);
router.route("/:id").get(orderController.getOrderById);
router.route("/fullfill/webhook").post(orderController.fullFillOrder);

export default router;
