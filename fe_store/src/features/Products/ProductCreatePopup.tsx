import { Button } from "common/components/Button";
import { InputField } from "common/components/Form/InputField";
import {
  SelectField,
  SelectFieldOptionsProps,
} from "common/components/Form/SelectField";
import { TextAreaField } from "common/components/Form/TextAreaField";
import { Modal } from "common/components/Modal";
import { CategoryProps } from "features/Admin/components/Cells/CategoryCell";
import { Formik, Form, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import API from "api/axios";
import { toast } from "react-toastify";
import { useLoading } from "hooks/useLoading";
import { UploadField } from "common/components/Form/UploadField";

interface ProductCreatePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductCreateFormProps {
  description: string;
  image: string;
  name: string;
  price: number;
  productCategoryId: string;
  productTypeId: string;
}

const productCreateField = {
  name: "Product Name",
  price: "Price",
  productTypeId: "Product Type",
  productCategoryId: "Category",
  description: "Description",
  image: "Image",
};

const initialValues: ProductCreateFormProps = {
  description: "",
  name: "",
  price: 0,
  productCategoryId: "",
  productTypeId: "",
  image: "",
};

const RequiredErrorMessage = "This field is required";
const PriceErrorMessage = "Price must be over than 0$";

const productCreateSchema: yup.SchemaOf<ProductCreateFormProps> = yup
  .object()
  .shape({
    name: yup.string().required(RequiredErrorMessage),
    description: yup.string().required(RequiredErrorMessage),
    price: yup
      .number()
      .required(RequiredErrorMessage)
      .positive(PriceErrorMessage),
    image: yup.string().required(RequiredErrorMessage),
    productCategoryId: yup.string().required(RequiredErrorMessage),
    productTypeId: yup.string().required(RequiredErrorMessage),
  });

export const ProductCreatePopup = ({
  isOpen,
  onClose,
}: ProductCreatePopupProps): JSX.Element => {
  const [showLoading, hideLoading] = useLoading();

  const handleCreateProduct = async (values: FormikValues) => {
    console.log("values submit", values);
    console.log("values.file", values.image);

    try {
      showLoading();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("productCategoryId", values.productCategoryId);
      formData.append("productTypeId", values.productTypeId);
      formData.append("image", values.image);

      await API.post(`/product/create`, formData);
      hideLoading();
    } catch (error: any) {
      hideLoading();
      toast.error(error.message);
    }
  };

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

  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <div className="font-medium">
        <h2 className="text-h2 mb-2 text-dark-red">New product</h2>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={productCreateSchema}
          onSubmit={(values) => handleCreateProduct(values)}
        >
          {({ values, handleChange, setFieldValue, setFieldError, errors }) => (
            <Form
              autoComplete="off"
              noValidate
              className="flex flex-col font-medium"
              encType="multipart/form-data"
            >
              <div className="flex flex-col mb-4">
                <>
                  {Object.entries(productCreateField).map(
                    ([key, value], index) => {
                      if (key === "image") {
                        return (
                          <UploadField
                            name={key}
                            label={value}
                            key={key}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                          />
                        );
                      }
                      if (key === "description") {
                        return (
                          <TextAreaField
                            key={key}
                            name={key}
                            label={value}
                            value={values.description}
                            onChange={handleChange}
                          />
                        );
                      }
                      if (key === "productCategoryId") {
                        return (
                          <SelectField
                            key={key}
                            name={key}
                            label={value}
                            defaultValue={{
                              label: "Select Category",
                              value: "",
                            }}
                            options={categoryOptions || []}
                            onChange={handleChange}
                            setFieldValue={setFieldValue}
                            dependField="productTypeId"
                            dependValue={values.productTypeId}
                            isDisable={!values.productTypeId}
                          />
                        );
                      }
                      if (key === "productTypeId") {
                        return (
                          <SelectField
                            key={key}
                            name={key}
                            label={value}
                            defaultValue={{
                              label: "Select Product Type",
                              value: "",
                            }}
                            options={productTypeOptions || []}
                            onChange={handleChange}
                            setFieldValue={setFieldValue}
                          />
                        );
                      }
                      return <InputField name={key} label={value} key={key} />;
                    }
                  )}
                </>
              </div>
              <Button
                className="flex items-center gap-4 justify-center w-1/2 m-auto"
                type="submit"
              >
                <span>Create</span>
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
