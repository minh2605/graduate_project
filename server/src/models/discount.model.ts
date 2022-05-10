import mongoose, { Types } from "mongoose";

export interface DiscountDocument extends mongoose.Document {
  discount_code: string;
  discount_value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const discountSchema = new mongoose.Schema(
  {
    discount_code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    discount_value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DiscountModel = mongoose.model<DiscountDocument>(
  "Discount",
  discountSchema
);
export default DiscountModel;
