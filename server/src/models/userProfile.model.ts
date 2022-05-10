import mongoose, { Types } from "mongoose";

export interface UserProfileDocument extends mongoose.Document {
  account_id: Types.ObjectId;
  first_name: string;
  last_name: string;
  address: string;
  city: Date;
  birthday: Date;
  gender: boolean;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userProfileSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "Account",
    },
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: Boolean,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserProfileModel = mongoose.model<UserProfileDocument>(
  "UserProfile",
  userProfileSchema
);
export default UserProfileModel;
