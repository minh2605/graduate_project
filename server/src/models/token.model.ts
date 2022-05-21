import mongoose, { Types } from "mongoose";
import { TokenType } from "../config/token";

export interface TokenDocument extends mongoose.Document {
  token: string;
  account: Types.ObjectId;
  type: TokenType;
  expires: Date;
}

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Account",
    },
    type: {
      type: String,
      enum: TokenType,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TokenModel = mongoose.model<TokenDocument>("Token", tokenSchema);
export default TokenModel;
