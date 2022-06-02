import ProductModel, { ProductDocument } from "../models/product.model";
import { Types } from "mongoose";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import uniqid from "uniqid";

const createProduct = async (
  productBody: Omit<ProductDocument, "productCode">
) => {
  const productCode =
    productBody.name.slice(0, 1) +
    productBody.productCategoryId.toString().substr(-2) +
    productBody.productTypeId.toString().substr(-2) +
    uniqid.process().slice(4);
  const newProduct = await ProductModel.create({ ...productBody, productCode });
  return newProduct;
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
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  await product.remove();
  return product;
};

const productService = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
};

export default productService;
