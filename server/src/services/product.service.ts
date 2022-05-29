import ProductModel, { ProductDocument } from "../models/product.model";
import { Types } from "mongoose";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const createProduct = async (productBody: ProductDocument) => {
  const productType = await ProductModel.create(productBody);
  return productType;
};

const getProducts = async () => {
  const productTypeList = await ProductModel.find();
  return productTypeList;
};

const getProductById = async (id: string) => {
  return ProductModel.findById(id);
};
const updateProductById = async (
  productId: string,
  updateBody: any,
  files?: any
) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};
const deleteProduct = async (id: string) => {
  return ProductModel.findById(id);
};

const productService = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
};

export default productService;
