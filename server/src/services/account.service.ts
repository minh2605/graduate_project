import httpStatus from "http-status";
import AccountModel, { AccountDocument } from "../models/account.model";
import ApiError from "../utils/ApiError";
import userService from "./user.service";
export type AccountRegister = Pick<AccountDocument, "email" | "password">;

const createAccount = async (accountBody: AccountRegister) => {
  const { password } = accountBody;
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
  return {
    email: account.email,
    role_name: account.role_name,
    name: user?.name,
    account_id: user?.account_id,
    address: user?.address ?? "",
    city: user?.city ?? "",
    birthday: user?.birthday ?? "",
    gender: user?.gender ?? "",
    avatar: user?.avatar ?? "",
  };
};

const accountService = {
  createAccount,
  getAccountByEmail,
  login,
};

export default accountService;
