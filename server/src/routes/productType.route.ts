import express from "express";
import productTypeController from "../controllers/productType.controller";

const router = express.Router();

router.route("/list").get(productTypeController.getProductTypes);
router.route("/:id").get(productTypeController.getProductTypeById);
router.route("/create").post(productTypeController.createProductType);
router.route("/update").put(productTypeController.updateProductType);
export default router;
