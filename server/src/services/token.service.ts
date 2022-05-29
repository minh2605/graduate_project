import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from "http-status";
import { envConfig } from "../config/config";
import { TokenType } from "../config/token";
import TokenModel from "../models/token.model";
import accountService, { LoginResponseProps } from "./account.service";
import { Types } from "mongoose";
import ApiError from "../utils/ApiError";

const generateToken = (
  accountId: Types.ObjectId | string,
  expires: Moment,
  type: TokenType,
  secret = envConfig.jwt.secret
) => {
  const payload = {
    sub: accountId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  accountId: Types.ObjectId | string,
  expires: Moment,
  type: TokenType
) => {
  const tokenDoc = await TokenModel.create({
    token,
    account: accountId,
    expires: expires.toDate(),
    type,
  });
  return tokenDoc;
};

const verifyToken = async (token: string, type: TokenType) => {
  const payload = jwt.verify(token, envConfig.jwt.secret);
  console.log("payload", payload);
  const tokenDoc = await TokenModel.findOne({
    type,
    account: payload.sub,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

const generateResetPasswordToken = async (email: string) => {
  const account = await accountService.getAccountByEmail(email);
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(
    envConfig.jwt.resetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    account._id,
    expires,
    TokenType.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    account._id,
    expires,
    TokenType.RESET_PASSWORD
  );
  return resetPasswordToken;
};

const generateAuthTokens = async (user: LoginResponseProps) => {
  const accessTokenExpires = moment().add(
    envConfig.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.account_id,
    accessTokenExpires,
    TokenType.ACCESS
  );

  const refreshTokenExpires = moment().add(
    envConfig.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.account_id,
    refreshTokenExpires,
    TokenType.REFRESH
  );
  await saveToken(
    refreshToken,
    user.account_id,
    refreshTokenExpires,
    TokenType.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const tokenServices = {
  saveToken,
  generateAuthTokens,
  verifyToken,
  generateResetPasswordToken,
};

export default tokenServices;
