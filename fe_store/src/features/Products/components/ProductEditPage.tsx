import { Button } from "common/components/Button";
import { ProductProps } from "common/components/ProductCard";
import { Formik, Form, FieldArray } from "formik";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  PriceErrorMessage,
  RequiredErrorMessage,
} from "features/Products/ProductCreatePopup";
import API from "api/axios";
import { useParams } from "react-router-dom";
import { UploadField } from "common/components/Form/UploadField";
import { InputField } from "common/components/Form/InputField";
import { TextAreaField } from "common/components/Form/TextAreaField";
import { CategoryProps } from "features/Admin/components/Cells/CategoryCell";
import {
  SelectField,
  SelectFieldOptionsProps,
} from "common/components/Form/SelectField";

interface ProductEditFormProps {
  description: string;
  image: string;
  name: string;
  price: number;
  productCategoryId: string;
  productTypeId: string;
  slideImages?: string[];
}
const productUpdateSchema: yup.SchemaOf<ProductEditFormProps> = yup
  .object()
  .shape({
    name: yup.string().required(RequiredErrorMessage),
    description: yup.string().required(RequiredErrorMessage),
    price: yup
      .number()
      .required(RequiredErrorMessage)
      .positive(PriceErrorMessage),
    image: yup.string().required(RequiredErrorMessage).nullable(),
    productCategoryId: yup.string().required(RequiredErrorMessage),
    productTypeId: yup.string().required(RequiredErrorMessage),
    slideImages: yup.array(),
  });

export const ProductEditPage = (): JSX.Element => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async (productId: string) => {
      try {
        showLoading();
        const product: ProductProps = await API.get(`/product/${productId}`);
        if (product) {
          setProduct(product);
          hideLoading();
        }
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    };
    if (productId) {
      fetchData(productId);
    }
  }, [productId, showLoading, hideLoading]);
  const [categoryOptions, setCategoryOptions] =
    useState<SelectFieldOptionsProps<string>[]>();
  const [productTypeOptions, setProductTypeOptions] =
    useState<SelectFieldOptionsProps<string>[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryList: CategoryProps[] = await API.get(`/category/list`);
        if (categoryList) {
          const categoryListsOptions = categoryList.map((it) => {
            return {
              value: it._id,
              label: it.name,
              productTypeId: it.productTypeId,
            };
          });
          setCategoryOptions(categoryListsOptions);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productTypes: CategoryProps[] = await API.get(
          `/product_type/list`
        );
        if (productTypes) {
          const productTypesOptions = productTypes.map((it) => {
            return {
              value: it._id,
              label: it.name,
            };
          });
          setProductTypeOptions(productTypesOptions);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  const initialValues: ProductEditFormProps = product
    ? {
        description: product.description,
        name: product.name,
        price: product.price,
        productCategoryId: product.productCategoryId,
        productTypeId: product.productTypeId,
        image: product.image,
        slideImages: ["a", "b", "c", "d"],
      }
    : {
        description: "",
        name: "",
        price: 0,
        productCategoryId: "",
        productTypeId: "",
        image: "",
        slideImages: [],
      };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={productUpdateSchema}
      onSubmit={(values) => {
        console.log("values submit", values);
      }}
      enableReinitialize={true}
    >
      {({ values, errors, setFieldValue, setFieldError, handleChange }) => {
        // console.log("errors", errors);
        return (
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
            <div className="text-h2 mb-4">Edit Product</div>
            <div className="flex items-center space-between gap-8">
              <div>
                <UploadField
                  className="h-72 w-96"
                  name="image"
                  label="Image"
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  errors={errors}
                  value={values.image}
                />
                <div className="">
                  <FieldArray
                    name="friends"
                    render={(arrayHelpers) => {
                      // console.log("arrayHelpers", arrayHelpers);
                      return (
                        <div className="grid grid-rows-2 grid-cols-2 gap-2">
                          {values.slideImages &&
                          values.slideImages.length > 0 ? (
                            values.slideImages.map((image, index) => (
                              <UploadField
                                key={index}
                                index={index}
                                className="h-40"
                                name={`slideImages.${index}`}
                                label="Image"
                                setFieldValue={setFieldValue}
                                setFieldError={setFieldError}
                                errors={errors}
                              />
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <InputField name="name" label="Name" />
                <InputField name="price" label="Price" />
                <SelectField
                  name="productTypeId"
                  label="Product Type"
                  defaultValue={{
                    label: "Select Product Type",
                    value: "",
                  }}
                  value={values.productTypeId}
                  options={productTypeOptions || []}
                  onChange={handleChange}
                  setFieldValue={setFieldValue}
                />
                <SelectField
                  name="productCategoryId"
                  label="Category"
                  defaultValue={{
                    label: "Select Category",
                    value: "",
                  }}
                  value={values.productCategoryId}
                  options={categoryOptions || []}
                  onChange={handleChange}
                  setFieldValue={setFieldValue}
                  dependField="productTypeId"
                  dependValue={values.productTypeId}
                  isDisable={!values.productTypeId}
                />
                <TextAreaField
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button
              className="flex items-center gap-4 justify-center w-1/2 m-auto"
              type="submit"
            >
              <span>Save</span>
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
