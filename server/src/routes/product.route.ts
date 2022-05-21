import express from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router
  .route("/list")
  .get(authMiddleware.tokenCheck, productController.getProducts);
router.route("/create").post(productController.createProduct);
router.route("/:id").get(productController.getProductById);

export default router;
