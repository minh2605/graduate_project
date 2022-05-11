import { SwitchButton } from "common/components/SwitchButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
export interface ToggleOrderTypeFormValue {
  enable_delivery: boolean;
}

export const OrderTypeBar = (): JSX.Element => {
  const initialValues: ToggleOrderTypeFormValue = {
    enable_delivery: false,
  };
  const orderTypeSchema: yup.SchemaOf<ToggleOrderTypeFormValue> = yup
    .object()
    .shape({
      enable_delivery: yup.boolean().required(),
    });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={orderTypeSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values) => {
        console.log("values", values);
      }}
    >
      {({ values }) => {
        return (
          <Form autoComplete="off" noValidate>
            <div className="flex items-center justify-between font-medium pb-4 border-b border-light-grey">
              <div className="flex flex-1 items-center gap-10 p-4 border border-border-grey">
                <div className="flex flex-col items-center basis-1/2">
                  <span>
                    {values.enable_delivery ? "Delivery Fee" : "Pickup Fee"}
                  </span>
                  <span>$10:00 in fees</span>
                </div>
                <div className="flex flex-col items-center basis-1/2">
                  <span>
                    {values.enable_delivery ? "Delivery Time" : "Pickup Time"}
                  </span>
                  <span>$10:00 am</span>
                </div>
              </div>
              <div className="flex justify-end basis-1/2">
                <SwitchButton
                  name="enable_delivery"
                  label="Delivery"
                  checked={values.enable_delivery}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
