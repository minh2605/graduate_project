import express from "express";
import productTypeController from "../controllers/productType.controller";

const router = express.Router();

router.route("/list").get(productTypeController.getProductTypes);
export default router;
