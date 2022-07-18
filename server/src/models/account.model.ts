import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";

export enum AccountRole {
  ADMIN = "admin",
  USER = "user",
}
export interface AccountDocument extends mongoose.Document {
  email: string;
  password: string;
  role_name: string;
  order_ids?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  setPassword: (password: string) => Promise<void>;
  checkPasswordMatch: (password: string) => Promise<boolean>;
}

interface IAccountModel extends mongoose.Model<AccountDocument> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
}

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role_name: {
      type: String,
      enum: AccountRole.USER,
      default: AccountRole.USER,
    },
    order_ids: [
      {
        type: mongoose.SchemaTypes.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

accountSchema.methods.setPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  this.password = hash;
  this.save();
};

accountSchema.methods.checkPasswordMatch = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

accountSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId: Types.ObjectId
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const AccountModel = mongoose.model<AccountDocument, IAccountModel>(
  "Account",
  accountSchema
);
export default AccountModel;
