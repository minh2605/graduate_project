import UserProfileModel from "../models/userProfile.model";
import { Types } from "mongoose";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import AccountModel from "../models/account.model";

export type UserCreateProps = {
  account_id: Types.ObjectId;
  name: string;
  address?: string;
  city?: string;
  birthday?: Date;
  gender?: boolean;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const createUser = async (userBody: UserCreateProps) => {
  const newUser = await UserProfileModel.create(userBody);
  return newUser;
};

const getUsers = async () => {
  const userList = await UserProfileModel.find();
  return userList;
};

const getUserByAccountId = async (accountId: string) => {
  const userByAccountId = await UserProfileModel.findOne({
    account_id: accountId,
  });
  return userByAccountId;
};

const getUserById = async (id: string) => {
  return UserProfileModel.findById(id);
};

const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    updateBody.email &&
    (await AccountModel.isEmailTaken(updateBody.email, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const userService = {
  getUsers,
  createUser,
  getUserByAccountId,
  getUserById,
  updateUserById,
};

export default userService;
