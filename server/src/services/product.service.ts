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
  files?: { [fieldname: string]: Express.Multer.File[] }
) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  console.log("========= updateBody ===========", updateBody);
  // console.log("========= REQ.Files ===========", req.files);
  // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  // console.log("========= product ===========", product);
  const newSlideImages = files
    ? files.slideImages.map((it) => it.path)
    : product?.slideImages;
  updateBody.slideImages = newSlideImages;
  Object.assign(product, updateBody);
  product.markModified("slideImages");
  await product.save();
  console.log("UPDATE PRODUCT", product);
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
