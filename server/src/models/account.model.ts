import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";

enum AccountRole {
  ADMIN = "admin",
  USER = "user",
}
export interface AccountDocument extends mongoose.Document {
  email: string;
  password: string;
  role_name?: string;
  order_ids?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  setPassword: (password: string) => Promise<void>;
  checkPasswordMatch: (password: string) => Promise<boolean>;
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
      required: true,
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

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;
