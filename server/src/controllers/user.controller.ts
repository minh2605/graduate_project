import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const userController = {
  createUser,
};

export default userController;
