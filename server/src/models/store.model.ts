import mongoose, { Types } from "mongoose";

export interface StoreDocument extends mongoose.Document {
  logo: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  description: string;
  cover_photo: string;
  favicon: string;
  sound_notification: boolean;
  open_days: string[];
}

const storeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
    cover_photo: {
      type: String,
      required: true,
      trim: true,
    },
    favicon: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    open_days: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StoreModel = mongoose.model<StoreDocument>("Store", storeSchema);
export default StoreModel;
