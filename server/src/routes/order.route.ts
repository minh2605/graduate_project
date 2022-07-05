import express from "express";
import orderController from "../controllers/order.controller";

const router = express.Router();

router.route("/create").post(orderController.createOrder);
router.route("/list").get(orderController.getOrders);
router.route("/list/:accountId").get(orderController.getOrdersByAccountId);
router.route("/revenue").get(orderController.getRevenueByDateRange);
router
  .route("/:id")
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrderById);
router.route("/fullfill/webhook").post(orderController.fullFillOrder);
router.route("/delete/:id").post(orderController.softDeleteOrderById);

export default router;
