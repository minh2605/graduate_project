import { Button } from "common/components/Button";
import { ProductProps } from "common/components/ProductCard";
import { Formik, Form } from "formik";
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

interface ProductEditPageProps {}

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
    image: yup.string().required(RequiredErrorMessage),
    productCategoryId: yup.string().required(RequiredErrorMessage),
    productTypeId: yup.string().required(RequiredErrorMessage),
    slideImages: yup.array(),
  });

export const ProductEditPage = ({}: ProductEditPageProps): JSX.Element => {
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
  const initialValues: ProductEditFormProps = product
    ? {
        description: product.description,
        name: product.name,
        price: product.price,
        productCategoryId: product.productCategoryId,
        productTypeId: product.productTypeId,
        image: product.image,
        slideImages: product.slideImages,
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
      onSubmit={(values) => {}}
      enableReinitialize={true}
    >
      {({ values, errors, setFieldValue, setFieldError }) => (
        <Form
          autoComplete="off"
          noValidate
          className="flex flex-col font-medium"
        >
          <div>Edit Product</div>
          <div className="flex items-center space-between">
            <div>
              <UploadField
                name="image"
                label="Image"
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                errors={errors}
              />
            </div>
            <div></div>
          </div>
          <Button
            className="flex items-center gap-4 justify-center w-1/2 m-auto"
            type="submit"
          >
            <span>Save</span>
          </Button>
        </Form>
      )}
    </Formik>
  );
};
