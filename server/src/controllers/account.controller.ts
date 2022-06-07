import { Request, Response } from "express";
import accountService, { AccountRegister } from "../services/account.service";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import userService, { UserCreateProps } from "../services/user.service";
import tokenServices from "../services/token.service";
import tokenService from "../services/token.service";
import emailService from "../services/email.service";
import firebaseAdmin from "../firebaseAdmin";

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
  res.status(httpStatus.OK).send();
});

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.json({
    message:
      "Send request reset password successfully. Please check your email",
    status: httpStatus.OK,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const resetToken = req.query.token;
  if (resetToken) {
    await accountService.resetPassword(
      resetToken.toString(),
      req.body.password
    );
    res.status(httpStatus.OK).send();
  }
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const decodeValue = await firebaseAdmin.auth().verifyIdToken(idToken);
  const { name, picture, email } = decodeValue;
  if (email) {
    const account = await accountService.getAccountByEmail(email);
    if (!account) {
      const newAccount = await accountService.createAccount({ email: email });
      const userCreateBody: UserCreateProps = {
        account_id: newAccount._id,
        name,
        avatar: picture,
      };
      await userService.createUser(userCreateBody);
    }
    const userResponse = await accountService.loginGoogle(email);
    const tokens = await tokenServices.generateAuthTokens(userResponse);
    res.send({ user: userResponse, tokens });
  }
});

const accountController = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  googleLogin,
};

export default accountController;
