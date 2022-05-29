import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import passport from "passport";
import { AccountRole } from "../models/account.model";
import ApiError from "../utils/ApiError";
import tokenServices from "../services/token.service";
import { TokenType } from "../config/token";

const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: any, user: any, info: any) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const hasRequiredRights = requiredRights.every(
        (requiredRight) => requiredRight === AccountRole.ADMIN
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const authCheck =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

const tokenCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers["authorization"];
    console.log("bearerHeader ", bearerHeader);
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const token = await tokenServices.verifyToken(
        bearerToken,
        TokenType.ACCESS
      );
      if (token) {
        next();
      }
    } else throw new Error("Token not found");
  } catch (error) {
    next(error);
  }
};

const authMiddleware = {
  authCheck,
  tokenCheck,
};

export default authMiddleware;
