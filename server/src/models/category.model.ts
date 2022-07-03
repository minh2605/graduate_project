import mongoose, { Types } from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  name: string;
  productTypeId: Types.ObjectId;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDelete?: boolean;
}

const categorySchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);
export default CategoryModel;
