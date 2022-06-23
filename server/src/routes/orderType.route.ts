import express from "express";
import orderTypeController from "../controllers/orderType.controller";

const router = express.Router();

router.route("/list").get(orderTypeController.getOrderTypes);
router.route("/:id").get(orderTypeController.getOrderTypeById);
router.route("/create").post(orderTypeController.createOrderType);
export default router;
