import { Button } from "common/components/Button";
import { InputField } from "common/components/Form/InputField";
import { SelectFieldOptionsProps } from "common/components/Form/SelectField";
import { TextAreaField } from "common/components/Form/TextAreaField";
import { RequiredErrorMessage } from "features/Products/ProductCreatePopup";
import { Formik, Form, FormikValues } from "formik";
import useCart from "hooks/useCart";
import { useEffect, useState } from "react";
import * as yup from "yup";
import API from "api/axios";
import { useLoading } from "hooks/useLoading";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PaymentTypeRadioGroup } from "features/Checkout/components/PaymentTypeRadioGroup";
import SvgCard from "common/components/svg/Card";
import SvgCash from "common/components/svg/Cash";
import { useDispatch } from "redux/hook";
import { clearCart } from "redux/slices/cart/cartSlice";

type ISODate = string;

interface CheckoutFormValueProps {
  address: string;
  city: string;
  date: string;
  phone: string;
  order_note?: string;
}

interface OrderTypeValueProps {
  _id: string;
  big_order_value: number;
  enable_big_order: boolean;
  fee: number;
  name: string;
  updatedAt?: ISODate;
  createdAt?: ISODate;
}

export enum PaymentType {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
}

export enum OrderStatus {
  PENDING = "PENDING",
  FULLFILL = "FULLFILL",
}

const paymentTypeOptions: SelectFieldOptionsProps<PaymentType>[] = [
  { label: "Cash", value: PaymentType.CASH, icon: <SvgCash /> },
  { label: "Credit card", value: PaymentType.CREDIT_CARD, icon: <SvgCard /> },
];

const initialValues = {
  address: "",
  city: "",
  date: "",
  phone: "",
  order_note: "",
  payment_type: PaymentType.CASH,
};
const checkoutInfoSchema: yup.SchemaOf<CheckoutFormValueProps> = yup
  .object()
  .shape({
    city: yup.string().required(RequiredErrorMessage),
    address: yup.string().required(RequiredErrorMessage),
    phone: yup.string().required(RequiredErrorMessage),
    date: yup
      .string()
      .required(RequiredErrorMessage)
      .test(
        "invalid-date",
        "Date receive must start from today",
        (value: any) => {
          const today = new Date();
          const dateSelected = new Date(value);
          const previousDate = new Date(today.getTime());
          previousDate.setDate(today.getDate() - 1);
          return dateSelected.getTime() >= previousDate.getTime();
        }
      ),
    order_note: yup.string(),
    payment_type: yup.string(),
  });
export const CheckoutForm = (): JSX.Element => {
  const [showLoading, hideLoading] = useLoading();
  const [orderTypes, setOrderTypes] = useState<OrderTypeValueProps[]>([]);
  const { currentUserProfile } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<
    SelectFieldOptionsProps<PaymentType>
  >(paymentTypeOptions[0]);

  useEffect(() => {
    const fetchData = async () => {
      const data: OrderTypeValueProps[] = await API.get("order_type/list");
      setOrderTypes(data);
    };
    fetchData();
  }, []);
  const { productCart, totalPrice } = useCart();
  const handleCheckout = async (values: FormikValues) => {
    try {
      showLoading();
      const productList = productCart.map((product) => {
        return {
          productId: product.product._id,
          name: product.product.name,
          price: product.product.price,
          quantity: product.amount,
          image: product.product.image,
          productTypeId: product.product.productTypeId,
          productCategoryId: product.product.productCategoryId,
        };
      });
      const checkoutPayload = {
        account_id: currentUserProfile?.account_id,
        address: values.address,
        city: values.city,
        date: values.date,
        order_note: values.order_note,
        order_type_id: orderTypes[0]._id,
        product_list: productList,
        total_gross_amount: totalPrice,
        total_net_amount: totalPrice,
        status: OrderStatus.PENDING,
        payment_type: selected.value,
      };
      const checkoutUrl: string = await API.post(
        "order/create",
        checkoutPayload
      );
      hideLoading();
      dispatch(clearCart());
      if (selected.value === PaymentType.CREDIT_CARD) {
        window.open(checkoutUrl, "_self");
      } else navigate(checkoutUrl);
    } catch (error) {
      hideLoading();
      console.error(error);
    }
  };
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={checkoutInfoSchema}
      onSubmit={(values) => {
        handleCheckout(values);
      }}
    >
      {({ values, handleChange }) => {
        return (
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
            <div className="px-20 flex flex-col">
              <div className="flex items-center justify-between py-2 px-4 bg-light-red text-white mb-4 rounded font-bold">
                <div>${totalPrice}</div>
                <div>Delivery</div>
              </div>
              <div className="flex justify-between items-center gap-2 mb-4 text-base">
                <InputField
                  name="address"
                  label="Address"
                  className="basis-1/2"
                />
                <InputField name="city" label="City" className="basis-1/2" />
              </div>
              <div className="flex justify-between items-center gap-2 mb-4 text-base">
                <InputField
                  name="date"
                  label="Date"
                  type="date"
                  className="basis-1/2"
                />
                <InputField
                  name="phone"
                  label="Phone"
                  type="number"
                  className="basis-1/2"
                />
              </div>
              <div className="flex flex-col flex-1 gap-2 mb-4 text-base">
                <TextAreaField
                  name="order_note"
                  label="Order note"
                  value={values.order_note}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col flex-1 gap-2 mb-4 text-base">
                <PaymentTypeRadioGroup
                  options={paymentTypeOptions}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              <Button
                className="flex items-center gap-4 w-full justify-center mt-2 mb-4"
                type="submit"
              >
                <span>Place order</span>
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
