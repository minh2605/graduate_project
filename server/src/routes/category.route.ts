import express from "express";
import categoryController from "../controllers/category.controller";
import authMiddleware from "../middleware/auth";
import { uploadImages, uploadImageToFirebase } from "../middleware/uploadFile";

const router = express.Router();

router.route("/list").get(categoryController.getCategories);
router
  .route("/create")
  .post(
    authMiddleware.tokenCheck,
    uploadImages,
    uploadImageToFirebase,
    categoryController.createCategory
  );
router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(
    authMiddleware.tokenCheck,
    uploadImages,
    uploadImageToFirebase,
    categoryController.updateCategory
  )
  .delete(categoryController.deleteCategory);
router.route("/delete/:id").post(categoryController.softDeleteCategoryById);
export default router;
