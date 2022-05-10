import ProductTypeModel from "../models/productType.model";

const createProductType = async (productTypeBody: any) => {
  const productType = await ProductTypeModel.create(productTypeBody);
  return productType;
};

const getProductTypes = async () => {
  const productTypeList = await ProductTypeModel.find();
  return productTypeList;
};

const getProductTypeById = async (id: string) => {
  return ProductTypeModel.findById(id);
};

const productTypeService = {
  getProductTypes,
  getProductTypeById,
  createProductType,
};

export default productTypeService;
