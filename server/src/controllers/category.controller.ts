import { Request, Response } from "express";
import httpStatus from "http-status";
import categoryService from "../services/category.service";
import { catchAsync } from "../utils/catchAsync";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files.image[0].path;
  const newCategory = await categoryService.createCategory({
    ...req.body,
    slideImages: [null, null, null, null],
    image,
  });
  res.status(httpStatus.CREATED).send(newCategory);
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await categoryService.getCategories(req, res);
  res.status(httpStatus.OK).send(categories);
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id: categoryId } = req.params;
  const categoryById = await categoryService.getCategoryById(categoryId);
  res.status(httpStatus.OK).send(categoryById);
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files.image?.[0]?.path;
  const category = await categoryService.updateCategoryById(
    req.params.id,
    req.body,
    image
  );
  res.status(httpStatus.OK).send(category);
});

const softDeleteCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const { id: categoryId } = req.params;
    await categoryService.softDeleteCategoryById(categoryId);
    res.status(httpStatus.NO_CONTENT).send();
  }
);

const retrieveCategory = catchAsync(async (req: Request, res: Response) => {
  const { id: categorytId } = req.params;
  await categoryService.retrieveCategory(categorytId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id: categoryId } = req.params;
  await categoryService.deleteCategory(categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  softDeleteCategoryById,
  retrieveCategory,
};

export default categoryController;
