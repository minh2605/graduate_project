import express from "express";
import orderController from "../controllers/order.controller";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.route("/create").post(orderController.createOrder);
router.route("/list").get(authMiddleware.tokenCheck, orderController.getOrders);
router
  .route("/list/:accountId")
  .get(authMiddleware.tokenCheck, orderController.getOrdersByAccountId);
router.route("/revenue").get(orderController.getRevenueByDateRange);
router
  .route("/:id")
  .get(authMiddleware.tokenCheck, orderController.getOrderById)
  .delete(authMiddleware.tokenCheck, orderController.deleteOrderById);
router.route("/fullfill/webhook").post(orderController.fullFillOrder);
router
  .route("/resolve/:id")
  .put(authMiddleware.tokenCheck, orderController.resolveOrder);
router
  .route("/delete/:id")
  .post(authMiddleware.tokenCheck, orderController.softDeleteOrderById);

export default router;
