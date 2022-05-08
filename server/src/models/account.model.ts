import mongoose, { Types } from "mongoose";

export interface AccountDocument extends mongoose.Document {
  email: string;
  hash_pwd: string;
  role_name: string;
  order_ids: Types.ObjectId[];
}

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hash_pwd: {
      type: String,
      required: true,
      trim: true,
    },
    role_name: {
      type: String,
      trim: true,
    },
    order_ids: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;
