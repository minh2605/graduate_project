import { Request, Response } from "express";
import accountService from "../services/account.service";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await accountService.createAccount(req.body);
  const tokens = "temp token";
  res.status(httpStatus.CREATED).send({ user, tokens });
});

// const login = catchAsync(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await accountService.loginUserWithEmailAndPassword(email, password);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.send({ user, tokens });
// });

// const logout = catchAsync(async (req, res) => {
//   await authService.logout(req.body.refreshToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

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
};

export default accountController;
