import httpStatus from "http-status";
import AccountModel, { AccountDocument } from "../models/account.model";
import ApiError from "../utils/ApiError";
import userService from "./user.service";
import { Types } from "mongoose";
import { TokenType } from "../config/token";
import TokenModel from "../models/token.model";
import tokenService from "./token.service";
export type AccountRegister = {
  email: string;
  password?: string;
};

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
  if (password) {
    newAccount.setPassword(password);
  }
  return newAccount;
};

const getAccountByEmail = async (email: string) => {
  return AccountModel.findOne({ email });
};

const getAccountById = async (id: string) => {
  return AccountModel.findById(id);
};

const login = async (loginBody: AccountRegister) => {
  const { email, password } = loginBody;
  const account = await getAccountByEmail(email);
  const user = await userService.getUserByAccountId(account?._id);

  if (!account || (password && !(await account.checkPasswordMatch(password)))) {
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

const loginGoogle = async (email: string) => {
  const account = await getAccountByEmail(email);

  const user = await userService.getUserByAccountId(account?._id);

  const loginResponse: LoginResponseProps = {
    email: email,
    role_name: account ? account.role_name : "",
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
    console.log("resetPasswordTokenDoc", resetPasswordTokenDoc);
    const user = await userService.getUserByAccountId(
      resetPasswordTokenDoc.account.toString()
    );
    const account = await accountService.getAccountById(
      resetPasswordTokenDoc.account.toString()
    );
    if (!user) {
      throw new Error();
    }
    console.log("user", user);
    console.log("pass", newPassword);
    console.log("account", account);
    /*TODO: CORS when send request with params/query*/
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
  loginGoogle,
  logout,
  resetPassword,
  getAccountById,
};

export default accountService;
