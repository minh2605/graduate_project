import express from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middleware/auth";
import { uploadImages, uploadImageToFirebase } from "../middleware/uploadFile";

const router = express.Router();

router.route("/list").get(productController.getProducts);
router
  .route("/create")
  .post(
    authMiddleware.tokenCheck,
    uploadImages,
    uploadImageToFirebase,
    productController.createProduct
  );
router
  .route("/delete")
  .delete(authMiddleware.tokenCheck, productController.deleteProduct);
router
  .route("/:id")
  .get(productController.getProductById)
  .put(authMiddleware.tokenCheck, productController.updateProduct)
  .delete(authMiddleware.tokenCheck, productController.deleteProduct);

export default router;
