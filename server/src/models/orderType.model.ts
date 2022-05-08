import mongoose, { Types } from "mongoose";

export interface OrderTypeDocument extends mongoose.Document {
  name: string;
  fee: number;
  enable_big_order: boolean;
  big_order_value: number;
}

const orderTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    fee: {
      type: Number,
    },
    enable_big_order: {
      type: Boolean,
    },
    big_order_value: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const OrderTypeModel = mongoose.model<OrderTypeDocument>(
  "OrderType",
  orderTypeSchema
);
export default OrderTypeModel;
