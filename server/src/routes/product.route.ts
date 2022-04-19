import express from "express";
import productController from "../controllers/product.controller";

const router = express.Router();

router.route("/list").get(productController.getProducts);

export default router;
