import ProductModel, { ProductDocument } from "../models/product.model";

import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import uniqid from "uniqid";
import { Request, Response } from "express";

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

const getProducts = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  let perPage = limit > 1 && limit < 9 ? limit : 9;
  let page = Number(req.query.page) || 1;

  console.log("perPage", perPage);

  const productList = await ProductModel.find()
    .skip(perPage * (page - 1))
    .limit(perPage);
  const totalProduct = await ProductModel.countDocuments({});
  const totalPage = Math.ceil(totalProduct / perPage);

  return {
    productList,
    currentPage: page,
    limit: perPage,
    totalProduct,
    totalPage: totalPage,
  };
};

const getProductById = async (id: string) => {
  return ProductModel.findById(id);
};
const updateProductById = async (
  productId: string,
  updateBody: any,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (files) {
    const slideImageInfo = Object.keys(files).map((it) => {
      console.log(files[it][0]);
      const fileInfo = files[it][0];
      return {
        index: Number(fileInfo.fieldname.split("slideImages")[1]),
        path: fileInfo.path || "null",
      };
    });
    console.log("slideImageInfo", slideImageInfo);
    console.log("updateBody", updateBody);

    slideImageInfo.forEach((it) => {
      product.slideImages[it.index] = it.path;
    });
    Object.assign(product, updateBody);
    product.markModified("slideImages");
    await product.save();
    console.log("UPDATE PRODUCT", product);
    return product;
  }
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
