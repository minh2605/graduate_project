import mongoose, { Types } from "mongoose";

export interface ProductTypeDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
const productTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductTypeModel = mongoose.model<ProductTypeDocument>(
  "ProductType",
  productTypeSchema
);
export default ProductTypeModel;
