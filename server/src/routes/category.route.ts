import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router.route("/list").get(categoryController.getCategories);
router.route("/create").post(categoryController.createCategory);
router.route("/:id").get(categoryController.getCategoryById);
export default router;
