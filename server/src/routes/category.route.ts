import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router.route("/list").get(categoryController.getCategories);
router.route("/create").post(categoryController.createCategory);
export default router;
