import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import productService from "../services/product.service";
import { catchAsync } from "../utils/catchAsync";

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files.image[0].path;
    const newProduct = await productService.createProduct({
      ...req.body,
      slideImages: [null, null, null, null],
      image,
    });
    res.status(httpStatus.CREATED).send(newProduct);
  }
);

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getProducts(req, res);
  res.status(httpStatus.OK).send(products);
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const productById = await productService.getProductById(productId);
  res.status(httpStatus.OK).send(productById);
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const product = await productService.updateProductById(
    req.params.id,
    req.body,
    files
  );
  res.status(httpStatus.OK).send(product);
});

const softDeleteProductById = catchAsync(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    await productService.softDeleteProductById(productId);
    res.status(httpStatus.NO_CONTENT).send();
  }
);

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  await productService.deleteProduct(productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  softDeleteProductById,
};
export default productController;
