import mongoose, { Types } from "mongoose";

export interface ProductDocument extends mongoose.Document {
  productCode?: string;
  name: string;
  productTypeId: Types.ObjectId;
  productCategoryId: Types.ObjectId;
  price: number;
  description: string;
  image: string;
  slideImages: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    productTypeId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "ProductType",
    },
    productCategoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
      ref: "ProductCategory",
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    slideImages: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;
