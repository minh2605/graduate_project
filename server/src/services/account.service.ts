import httpStatus from "http-status";
import AccountModel, { AccountDocument } from "../models/account.model";
import ApiError from "../utils/ApiError";
import userService from "./user.service";
import { Types } from "mongoose";
import { TokenType } from "../config/token";
import TokenModel from "../models/token.model";
import tokenService from "./token.service";
export type AccountRegister = Pick<AccountDocument, "email" | "password">;

export interface LoginResponseProps {
  email: string;
  role_name: string;
  name: string;
  account_id: Types.ObjectId | string;
  address: string;
  city: string;
  birthday?: Date;
  gender?: boolean;
  avatar?: string;
}

const createAccount = async (accountBody: AccountRegister) => {
  const { email, password } = accountBody;
  if (await AccountModel.isEmailTaken(email)) {
    throw new ApiError(httpStatus.CONFLICT, "Email already taken");
  }
  const newAccount = await AccountModel.create(accountBody);
  newAccount.setPassword(password);
  return newAccount;
};

const getAccountByEmail = async (email: string) => {
  return AccountModel.findOne({ email });
};

const login = async (loginBody: AccountRegister) => {
  const { email, password } = loginBody;
  const account = await getAccountByEmail(email);
  const user = await userService.getUserByAccountId(account?._id);
  if (!account || !(await account.checkPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  const loginResponse: LoginResponseProps = {
    email: account.email,
    role_name: account.role_name ?? "",
    name: user?.name ?? "",
    account_id: user?.account_id ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    birthday: user?.birthday,
    gender: user?.gender,
    avatar: user?.avatar,
  };
  return loginResponse;
};

const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await TokenModel.findOne({
    token: refreshToken,
    type: TokenType.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};

const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      TokenType.RESET_PASSWORD
    );
    const user = await userService.getUserByAccountId(
      resetPasswordTokenDoc.account.toString()
    );
    if (!user) {
      throw new Error();
    }
    console.log("user", user);
    // await userService.updateUserById(user.id, { password: newPassword });
    // await TokenModel.deleteMany({
    //   user: user.id,
    //   type: TokenType.RESET_PASSWORD,
    // });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

const accountService = {
  createAccount,
  getAccountByEmail,
  login,
  logout,
  resetPassword,
};

export default accountService;