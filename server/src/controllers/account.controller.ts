import { Request, Response } from "express";
import accountService, { AccountRegister } from "../services/account.service";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import userService, { UserCreateProps } from "../services/user.service";
import tokenServices from "../services/token.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const accountRegister: AccountRegister = {
    email,
    password,
  };
  const account = await accountService.createAccount(accountRegister);
  const userCreateBody: UserCreateProps = {
    account_id: account._id,
    name,
  };
  await userService.createUser(userCreateBody);
  res.status(httpStatus.OK).send();
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await accountService.login({ email, password });
  const tokens = await tokenServices.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await accountService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

// const forgotPassword = catchAsync(async (req, res) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const resetPassword = catchAsync(async (req, res) => {
//   await authService.resetPassword(req.query.token, req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const accountController = {
  register,
  login,
  logout,
};

export default accountController;
