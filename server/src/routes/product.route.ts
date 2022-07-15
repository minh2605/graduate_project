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
  .route("/:id")
  .get(productController.getProductById)
  .put(
    authMiddleware.tokenCheck,
    uploadImages,
    uploadImageToFirebase,
    productController.updateProduct
  )
  .delete(authMiddleware.tokenCheck, productController.deleteProduct);
router.route("/delete/:id").post(productController.softDeleteProductById);
router
  .route("/retrieve/:id")
  .put(authMiddleware.tokenCheck, productController.retrieveProduct);
export default router;
