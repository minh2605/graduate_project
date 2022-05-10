import ProductModel, { ProductDocument } from "../models/product.model";

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
const updateProduct = async (id: string) => {
  return ProductModel.findById(id);
};
const deleteProduct = async (id: string) => {
  return ProductModel.findById(id);
};

const productService = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productService;
