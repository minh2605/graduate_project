import UserProfileModel from "../models/userProfile.model";
import { Types } from "mongoose";

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

const getUserByAccountId = async (accountId: string) => {
  const userByAccountId = await UserProfileModel.findOne({
    account_id: accountId,
  });
  return userByAccountId;
};

const userService = {
  createUser,
  getUserByAccountId,
};

export default userService;
