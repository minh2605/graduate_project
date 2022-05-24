import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import AccountModel from "../models/account.model";
import { envConfig } from "./config";
import { TokenType } from "./token";

const jwtOptions = {
  secretOrKey: envConfig.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await AccountModel.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
