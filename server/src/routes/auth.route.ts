import express from "express";
import accountController from "../controllers/account.controller";
import validate from "../middleware/validate";
import authValidation from "../validations/auth.validation";

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  accountController.register
);
router.post("/login", validate(authValidation.login), accountController.login);

export default router;
