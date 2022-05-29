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
router.delete(
  "/logout",
  validate(authValidation.logout),
  accountController.logout
);
router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  accountController.forgotPassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  accountController.resetPassword
);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), accountController.refreshTokens);

export default router;
