import { Button } from "common/components/Button";
import { ProductProps } from "common/components/ProductCard";
import { Formik, Form, FormikValues } from "formik";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { RequiredErrorMessage } from "features/Products/ProductCreatePopup";
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

interface CategoryEditFormProps {
  description: string;
  image: string;
  name: string;
  productTypeId: string;
}
const categoryUpdateSchema: yup.SchemaOf<CategoryEditFormProps> = yup
  .object()
  .shape({
    name: yup.string().required(RequiredErrorMessage),
    description: yup.string().required(RequiredErrorMessage),
    image: yup.string().required(RequiredErrorMessage).nullable(),
    productTypeId: yup.string().required(RequiredErrorMessage),
  });

export const CategoryEditPage = (): JSX.Element => {
  const { categoryId } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async (productId: string) => {
      try {
        showLoading();
        const product: ProductProps = await API.get(`/category/${categoryId}`);
        if (product) {
          setProduct(product);
          hideLoading();
        }
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    };
    if (categoryId) {
      fetchData(categoryId);
    }
  }, [categoryId, showLoading, hideLoading]);
  const [productTypeOptions, setProductTypeOptions] =
    useState<SelectFieldOptionsProps<string>[]>();

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
  const initialValues: CategoryEditFormProps = product
    ? {
        description: product.description,
        name: product.name,
        productTypeId: product.productTypeId,
        image: product.image,
      }
    : {
        description: "",
        name: "",
        productTypeId: "",
        image: "",
      };

  const handleEditProduct = async (values: FormikValues) => {
    try {
      showLoading();
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await API.put(`/category/${categoryId}`, formData);
      hideLoading();
      toast.success("Update product successfully");
    } catch (error: any) {
      hideLoading();
      toast.error(error.message);
    }
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={categoryUpdateSchema}
      onSubmit={(values) => {
        handleEditProduct(values);
      }}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        setFieldValue,
        setFieldError,
        handleChange,
        dirty,
      }) => {
        // console.log("errors", errors);
        return (
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
            <div className="text-h2 mb-4">Edit Category</div>
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
              </div>
              <div className="flex-1">
                <InputField name="name" label="Name" />
                <SelectField
                  name="productTypeId"
                  label="Product Type"
                  value={values.productTypeId}
                  options={productTypeOptions || []}
                  onChange={handleChange}
                  setFieldValue={setFieldValue}
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
              disabled={!dirty}
            >
              <span>Save</span>
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
