import express from "express";
import productController from "../controllers/product.controller";

const router = express.Router();

router.route("/list").get(productController.getProducts);
router.route("/create").post(productController.createProduct);
router.route("/:id").get(productController.getProductById);

export default router;
