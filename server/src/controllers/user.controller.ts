import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUsers();
  res.status(httpStatus.CREATED).send(user);
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const userById = await userService.getUserById(userId);
  res.status(httpStatus.OK).send(userById);
});

const getUserByAccountId = catchAsync(async (req: Request, res: Response) => {
  const { id: accountId } = req.params;
  const userByAccountId = await userService.getUserByAccountId(accountId);
  res.status(httpStatus.OK).send(userByAccountId);
});

const updateUserProfileByAccountId = catchAsync(
  async (req: Request, res: Response) => {
    const { id: accountId } = req.params;
    const updateBody = req.body;
    const userByAccountId = await userService.getUserByAccountId(accountId);
    const userProfileUpdate = await userService.updateUserById(
      userByAccountId?.id,
      updateBody
    );
    res.status(httpStatus.OK).send(userProfileUpdate);
  }
);

const userController = {
  getUsers,
  getUserByAccountId,
  getUserById,
  updateUserProfileByAccountId,
};

export default userController;
