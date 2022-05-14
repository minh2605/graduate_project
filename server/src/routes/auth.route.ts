import express from "express";
import accountController from "../controllers/account.controller";
import validate from "../middleware/validate";
import authValidation from "../validations/auth.validation";

const router = express.Router();

router.post("/register", validate(authValidation), accountController.register);
