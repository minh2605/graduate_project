import express from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.route("/list").get(productController.getProducts);
router
  .route("/create")
  .post(authMiddleware.tokenCheck, productController.createProduct);
router
  .route("/delete")
  .delete(authMiddleware.tokenCheck, productController.deleteProduct);
router
  .route("/:id")
  .get(productController.getProductById)
  .put(authMiddleware.tokenCheck, productController.updateProduct);

export default router;
