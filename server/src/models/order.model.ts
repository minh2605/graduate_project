import mongoose, { Types } from "mongoose";

export interface ProductItemPayload {
  productId: Types.ObjectId;
  name: string;
  price: number;
}

export enum PaymentType {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
}
export interface OrderDocument extends mongoose.Document {
  orderCode?: string;
  account_id: Types.ObjectId;
  total_gross_amount: number;
  total_net_amount: number;
  address: string;
  city: string;
  order_type_id: Types.ObjectId;
  discount_id: Types.ObjectId;
  product_list: ProductItemPayload[];
  date: Date;
  status: OrderStatus;
  payment_type: PaymentType;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum OrderStatus {
  PENDING = "PENDING",
  FULLFILL = "FULLFILL",
}

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    account_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "Account",
    },
    discount_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      trim: true,
      ref: "Discount",
    },
    order_type_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "OrderType",
    },
    product_list: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
      },
    ],
    total_gross_amount: {
      type: Number,
      required: true,
    },
    total_net_amount: {
      type: Number,
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
    order_note: {
      type: String,
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    },
    payment_type: {
      type: String,
      enum: PaymentType,
      default: PaymentType.CASH,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;
