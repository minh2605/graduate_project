import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from "http-status";
import { envConfig } from "../config/config";
import { TokenType } from "../config/token";
import TokenModel from "../models/token.model";
import { LoginResponseProps } from "./account.service";
import { Types } from "mongoose";

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
  const tokenDoc = await TokenModel.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
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
};

export default tokenServices;
