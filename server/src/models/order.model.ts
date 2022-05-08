import mongoose, { Types } from "mongoose";

export interface OrderDocument extends mongoose.Document {
  account_id: Types.ObjectId;
  total_gross_amount: number;
  total_net_amount: number;
  address: string;
  city: string;
  order_type_id: Types.ObjectId;
  discount_id: Types.ObjectId;
  product_ids: Types.ObjectId[];
  date: Date;
}

const orderSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "Account",
    },
    discount_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "Discount",
    },
    order_type_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "OrderType",
    },
    product_ids: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        trim: true,
        ref: "Product",
      },
    ],
    total_gross_amount: {
      type: Number,
      required: true,
    },
    total_net_amount: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;
