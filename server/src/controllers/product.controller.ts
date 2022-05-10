import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "../services/product.service";

const createProduct = async (req: Request, res: Response) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(newProduct);
};

const getProducts = async (req: Request, res: Response) => {
  const products = await productService.createProduct(req.body);
  res.status(httpStatus.OK).send(products);
};

const getProductById = async (req: Request, res: Response) => {
  const productById = await productService.createProduct(req.body);
  res.status(httpStatus.OK).send(productById);
};

const updateProduct = async (req: Request, res: Response) => {
  const updateProduct = await productService.createProduct(req.body);
  res.status(httpStatus.OK).send(updateProduct);
};
const deleteProduct = async (req: Request, res: Response) => {
  await productService.createProduct(req.body);
  res.status(httpStatus.NO_CONTENT).send();
};

const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
export default productController;
