import { Request, Response } from "express";
import httpStatus from "http-status";
import productService from "../services/product.service";
import { catchAsync } from "../utils/catchAsync";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(newProduct);
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res.status(httpStatus.OK).send(products);
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const productById = await productService.getProductById(productId);
  res.status(httpStatus.OK).send(productById);
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const updateProduct = await productService.updateProductById(
    productId,
    req.body
  );
  res.status(httpStatus.OK).send(updateProduct);
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.createProduct(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
export default productController;
