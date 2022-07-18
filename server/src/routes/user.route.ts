import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/list").get(userController.getUsers);
router.route("/:id").get(userController.getUserById);
router
  .route("/account/:id")
  .get(userController.getUserByAccountId)
  .put(userController.updateUserProfileByAccountId);
export default router;
