import { Button } from "common/components/Button";
import { InputField } from "common/components/Form/InputField";
import {
  SelectField,
  SelectFieldOptionsProps,
} from "common/components/Form/SelectField";
import { TextAreaField } from "common/components/Form/TextAreaField";
import { Modal } from "common/components/Modal";
import { Formik, Form, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import API from "api/axios";
import { toast } from "react-toastify";
import { useLoading } from "hooks/useLoading";
import { UploadField } from "common/components/Form/UploadField";
import { ProductTypeProps } from "features/Admin/components/Cells/ProductTypeCell";

interface ProductCreatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

interface CategoryCreateFormProps {
  description?: string;
  image: string;
  name: string;
  productTypeId: string;
}

const categoryCreateField = {
  name: "Category Name",
  productTypeId: "Product Type",
  description: "Description",
  image: "Image",
};

const initialValues: CategoryCreateFormProps = {
  description: "",
  name: "",
  productTypeId: "",
  image: "",
};

export const RequiredErrorMessage = "This field is required";
export const PriceErrorMessage = "Price must be over than 0$";

const categoryCreateSchema: yup.SchemaOf<CategoryCreateFormProps> = yup
  .object()
  .shape({
    name: yup.string().required(RequiredErrorMessage),
    description: yup.string(),
    image: yup.string().required(RequiredErrorMessage),
    productTypeId: yup.string().required(RequiredErrorMessage),
  });

export const CategoryCreatePopup = ({
  isOpen,
  onClose,
  mutate,
}: ProductCreatePopupProps): JSX.Element => {
  const [showLoading, hideLoading] = useLoading();

  const handleCreateCategory = async (values: FormikValues) => {
    try {
      showLoading();
      const formData = new FormData();
      Object.entries(values).forEach(([key, value], index) => {
        formData.append(key, value);
      });
      await API.post("category/create", formData);
      hideLoading();
      toast.success("Create product successfully");
      mutate();
      onClose();
    } catch (error: any) {
      hideLoading();
      toast.error(error.message);
    }
  };
  const [productTypeOptions, setProductTypeOptions] =
    useState<SelectFieldOptionsProps<string>[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productTypes: ProductTypeProps[] = await API.get(
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
        <h2 className="text-h2 mb-2 text-dark-red">New category</h2>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={categoryCreateSchema}
          onSubmit={(values) => handleCreateCategory(values)}
        >
          {({ values, handleChange, setFieldValue, setFieldError, errors }) => (
            <Form
              autoComplete="off"
              noValidate
              className="flex flex-col font-medium"
            >
              <div className="flex flex-col mb-4">
                <>
                  {Object.entries(categoryCreateField).map(
                    ([key, value], index) => {
                      if (key === "image") {
                        return (
                          <div className="flex items-center justify-center">
                            <UploadField
                              className="h-60 w-96"
                              name={key}
                              label={value}
                              key={key}
                              setFieldValue={setFieldValue}
                              setFieldError={setFieldError}
                              errors={errors}
                            />
                          </div>
                        );
                      }
                      if (key === "description") {
                        return (
                          <TextAreaField
                            key={key}
                            name={key}
                            label={value}
                            value={values.description ?? ""}
                            onChange={handleChange}
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
